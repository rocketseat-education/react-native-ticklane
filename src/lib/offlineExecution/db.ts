import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';

const DB_NAME = 'ticklane-offline-executions.db';

let dbPromise: Promise<SQLite.SQLiteDatabase | null> | null = null;

export async function getOfflineExecutionsDb(): Promise<SQLite.SQLiteDatabase | null> {
  if (Platform.OS === 'web') {
    return null;
  }

  if (!dbPromise) {
    dbPromise = (async () => {
      const db = await SQLite.openDatabaseAsync(DB_NAME);

      await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS offline_executions (
          id TEXT PRIMARY KEY NOT NULL,
          source_checklist_id TEXT NOT NULL,
          title TEXT NOT NULL,
          description TEXT NOT NULL DEFAULT '',
          category_name TEXT NOT NULL DEFAULT '',
          category_id TEXT NOT NULL DEFAULT '',
          author_name TEXT NOT NULL DEFAULT '',
          author_initials TEXT NOT NULL DEFAULT '',
          author_id TEXT NOT NULL DEFAULT '',
          links_json TEXT NOT NULL,
          items_json TEXT NOT NULL,
          started_at TEXT NOT NULL,
          updated_at TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS offline_execution_item_state (
          execution_id TEXT NOT NULL,
          item_id TEXT NOT NULL,
          checked INTEGER NOT NULL DEFAULT 0,
          checked_at TEXT,
          PRIMARY KEY (execution_id, item_id)
        );
        CREATE INDEX IF NOT EXISTS idx_offline_executions_updated
          ON offline_executions (updated_at DESC);
      `);

      return db;
    })();
  }

  return dbPromise;
}
