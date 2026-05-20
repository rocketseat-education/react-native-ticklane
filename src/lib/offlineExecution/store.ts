import type { ChecklistDetails, ChecklistItem } from '@/types';
import type { OfflineExecutionDetail, OfflineExecutionSummary } from '@/types/offline-execution';

import { getOfflineExecutionsDb } from './db';
import { createExecutionId } from './uuid';

function nowIso(): string {
  return new Date().toISOString();
}

export async function createOfflineExecutionFromChecklist(
  checklist: ChecklistDetails,
): Promise<string | null> {
  const db = await getOfflineExecutionsDb();

  if (!db) {
    return null;
  }

  const id = createExecutionId();
  const startedAt = nowIso();
  const linksJson = JSON.stringify(checklist.links);
  const itemsJson = JSON.stringify(checklist.items);

  await db.withTransactionAsync(async () => {
    await db.runAsync(
      `INSERT INTO offline_executions (
        id, source_checklist_id, title, description, category_name, category_id,
        author_name, author_initials, author_id, links_json, items_json, started_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        checklist.id,
        checklist.title,
        checklist.description ?? '',
        checklist.categoryName,
        checklist.categoryId,
        checklist.authorName,
        checklist.authorInitials ?? '',
        checklist.authorId,
        linksJson,
        itemsJson,
        startedAt,
        startedAt,
      ],
    );

    for (const item of checklist.items) {
      await db.runAsync(
        `INSERT INTO offline_execution_item_state (execution_id, item_id, checked, checked_at)
         VALUES (?, ?, 0, NULL)`,
        [id, item.id],
      );
    }
  });

  return id;
}

export async function listOfflineExecutions(): Promise<OfflineExecutionSummary[]> {
  const db = await getOfflineExecutionsDb();

  if (!db) {
    return [];
  }

  const rows = await db.getAllAsync<{
    id: string;
    source_checklist_id: string;
    title: string;
    category_name: string;
    started_at: string;
    updated_at: string;
    done_count: number;
    total_count: number;
  }>(
    `SELECT
      e.id,
      e.source_checklist_id,
      e.title,
      e.category_name,
      e.started_at,
      e.updated_at,
      (SELECT COUNT(*) FROM offline_execution_item_state s
        WHERE s.execution_id = e.id AND s.checked = 1) AS done_count,
      (SELECT COUNT(*) FROM offline_execution_item_state s
        WHERE s.execution_id = e.id) AS total_count
    FROM offline_executions e
    ORDER BY e.updated_at DESC`,
  );

  return rows.map((row) => ({
    id: row.id,
    sourceChecklistId: row.source_checklist_id,
    title: row.title,
    categoryName: row.category_name,
    doneCount: row.done_count,
    totalCount: row.total_count,
    startedAt: row.started_at,
    updatedAt: row.updated_at,
  }));
}

export async function getOfflineExecutionWithItems(
  executionId: string,
): Promise<OfflineExecutionDetail | null> {
  const db = await getOfflineExecutionsDb();

  if (!db) {
    return null;
  }

  const row = await db.getFirstAsync<{
    id: string;
    source_checklist_id: string;
    title: string;
    description: string;
    category_name: string;
    links_json: string;
    items_json: string;
  }>(
    `SELECT id, source_checklist_id, title, description, category_name, links_json, items_json
     FROM offline_executions WHERE id = ?`,
    [executionId],
  );

  if (!row) {
    return null;
  }

  const states = await db.getAllAsync<{
    item_id: string;
    checked: number;
    checked_at: string | null;
  }>(
    `SELECT item_id, checked, checked_at FROM offline_execution_item_state WHERE execution_id = ?`,
    [executionId],
  );

  const stateByItem = new Map(states.map((s) => [s.item_id, s]));

  const parsedItems = JSON.parse(row.items_json) as ChecklistItem[];

  const items = parsedItems.map((item) => {
    const st = stateByItem.get(item.id);

    return {
      ...item,
      checked: Boolean(st?.checked),
      checkedAt: st?.checked_at ?? undefined,
    };
  });

  items.sort((a, b) => a.order - b.order);

  return {
    id: row.id,
    sourceChecklistId: row.source_checklist_id,
    title: row.title,
    description: row.description,
    categoryName: row.category_name,
    links: JSON.parse(row.links_json),
    items,
  };
}

export async function setOfflineExecutionItemChecked(
  executionId: string,
  itemId: string,
  checked: boolean,
): Promise<void> {
  const db = await getOfflineExecutionsDb();

  if (!db) {
    return;
  }

  const ts = checked ? nowIso() : null;

  await db.withTransactionAsync(async () => {
    await db.runAsync(
      `UPDATE offline_execution_item_state
       SET checked = ?, checked_at = ?
       WHERE execution_id = ? AND item_id = ?`,
      [checked ? 1 : 0, ts, executionId, itemId],
    );
    await db.runAsync(`UPDATE offline_executions SET updated_at = ? WHERE id = ?`, [nowIso(), executionId]);
  });
}
