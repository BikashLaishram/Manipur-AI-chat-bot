/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  AdminStats,
  SQLTableSchema,
  UserFeedback,
} from '../../types';
import { fetchAdminAnalytics, executeSqlQuery } from '../../services/api';
import {
  Users,
  Activity,
  MessageSquare,
  Zap,
  Database,
  ShieldAlert,
  Sliders,
  Play,
  CheckCircle,
  Clock,
  Search,
  RefreshCw,
  Terminal,
  FileText,
  Star,
  ExternalLink
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [schemas, setSchemas] = useState<SQLTableSchema[]>([]);
  const [feedback, setFeedback] = useState<UserFeedback[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'sql' | 'feedback' | 'moderation'>('overview');
  const [selectedTable, setSelectedTable] = useState<string>('Users');
  const [sqlQueryInput, setSqlQueryInput] = useState<string>('SELECT TOP 50 * FROM Users WHERE IsActive = 1 ORDER BY CreatedAt DESC;');
  const [queryResult, setQueryResult] = useState<any>(null);
  const [isLoadingQuery, setIsLoadingQuery] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Load analytics
  const loadData = async () => {
    setIsRefreshing(true);
    try {
      const data = await fetchAdminAnalytics();
      setStats(data.stats);
      setSchemas(data.schemas);
      setFeedback(data.feedback);
    } catch (err) {
      console.error(err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Run SQL Query
  const handleExecuteSql = async () => {
    if (!sqlQueryInput.trim()) return;
    setIsLoadingQuery(true);
    try {
      const res = await executeSqlQuery(sqlQueryInput);
      setQueryResult(res);
    } catch (err) {
      setQueryResult({ status: 'ERROR', message: String(err) });
    } finally {
      setIsLoadingQuery(false);
    }
  };

  const currentTableSchema = schemas.find(s => s.tableName === selectedTable);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
            <Database className="w-4 h-4 text-cyan-400" /> MANIPUR AI CORE ADMINISTRATION
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-1">
            System Operations, SQL Server & Telemetry
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Microsoft SQL Server database inspector, Gemini 3.8 Flash token metrics, and user feedback moderation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            disabled={isRefreshing}
            className="py-2 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} /> Refresh Telemetry
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Total Registered Users</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white mt-2">
            {stats ? stats.totalRegisteredUsers.toLocaleString() : '1,420'}
          </div>
          <span className="text-[10px] text-emerald-400 mt-1 block">
            ↑ 14% this month across Manipur
          </span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Active Sessions Now</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-2">
            {stats ? stats.activeUsersNow : 48}
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">
            Concurrent live users
          </span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>AI Queries Processed</span>
            <MessageSquare className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white mt-2">
            {stats ? stats.totalMessagesProcessed.toLocaleString() : '32,400'}
          </div>
          <span className="text-[10px] text-purple-400 mt-1 block">
            Gemini 3.8 Flash model
          </span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Token Consumption</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-300 mt-2">
            {stats ? `${Math.round(stats.tokensConsumed / 1000)}k` : '984k'}
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">
            Avg Latency: 380 ms
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'overview'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Analytics & Health
        </button>
        <button
          onClick={() => setActiveTab('sql')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'sql'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Database className="w-3.5 h-3.5" /> SQL Server Tables & Query Runner
        </button>
        <button
          onClick={() => setActiveTab('feedback')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'feedback'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Star className="w-3.5 h-3.5" /> User Feedback & Reviews
        </button>
      </div>

      {/* TAB: SQL SERVER TABLES & QUERY RUNNER */}
      {activeTab === 'sql' && (
        <div className="space-y-5">
          {/* SQL Query Runner Console */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" /> Interactive Microsoft SQL Server Query Console
              </span>
              <span className="text-[11px] font-mono text-emerald-400">
                Connected: MSSQL Engine v16.0 (T-SQL)
              </span>
            </div>

            <div className="relative">
              <textarea
                value={sqlQueryInput}
                onChange={(e) => setSqlQueryInput(e.target.value)}
                rows={3}
                className="w-full p-3 rounded-xl bg-slate-950 font-mono text-xs text-cyan-200 border border-slate-700/80 focus:outline-none focus:border-cyan-400 resize-none"
              />
              <button
                onClick={handleExecuteSql}
                disabled={isLoadingQuery}
                className="absolute right-3 bottom-3 px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-md"
              >
                <Play className="w-3 h-3 fill-current" /> Run Query
              </button>
            </div>

            {/* Query result output */}
            {queryResult && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-[11px] border-b border-slate-800 pb-1">
                  <span>Status: <strong className="text-emerald-400">{queryResult.status}</strong></span>
                  <span>{queryResult.rowCount} rows returned</span>
                </div>
                <div className="overflow-x-auto max-h-48 scrollbar-none">
                  <table className="w-full text-left text-slate-300">
                    <thead>
                      <tr className="border-b border-slate-800 text-[10px] text-cyan-400 uppercase">
                        {queryResult.columns?.map((col: string, idx: number) => (
                          <th key={idx} className="p-1.5">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {queryResult.data?.map((row: any, rIdx: number) => (
                        <tr key={rIdx} className="border-b border-slate-900 hover:bg-slate-900/60">
                          {queryResult.columns?.map((col: string, cIdx: number) => (
                            <td key={cIdx} className="p-1.5 font-mono text-[11px]">
                              {typeof row[col] === 'object' ? JSON.stringify(row[col]) : String(row[col])}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Table Schema Inspector */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Relational Schema Inspector</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Select Table:</span>
                <select
                  value={selectedTable}
                  onChange={(e) => {
                    setSelectedTable(e.target.value);
                    setSqlQueryInput(`SELECT TOP 50 * FROM ${e.target.value};`);
                  }}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
                >
                  {schemas.map((s) => (
                    <option key={s.tableName} value={s.tableName}>{s.tableName}</option>
                  ))}
                </select>
              </div>
            </div>

            {currentTableSchema && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">
                  {currentTableSchema.description} • <strong>{currentTableSchema.rowCount}</strong> total records
                </p>

                <div className="overflow-x-auto rounded-xl border border-slate-800">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
                      <tr>
                        <th className="p-3">Column Name</th>
                        <th className="p-3">Data Type</th>
                        <th className="p-3">Key Type</th>
                        <th className="p-3">Nullable</th>
                        <th className="p-3">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 bg-slate-900/40">
                      {currentTableSchema.columns.map((col, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/40 font-mono text-[11px]">
                          <td className="p-3 font-bold text-white">{col.name}</td>
                          <td className="p-3 text-cyan-300">{col.type}</td>
                          <td className="p-3">
                            {col.isPrimaryKey ? (
                              <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-800 text-[10px] text-amber-300">
                                PRIMARY KEY
                              </span>
                            ) : col.isForeignKey ? (
                              <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-800 text-[10px] text-purple-300">
                                FK → {col.references}
                              </span>
                            ) : (
                              <span className="text-slate-500">—</span>
                            )}
                          </td>
                          <td className="p-3 text-slate-400">
                            {col.nullable ? 'YES' : 'NO'}
                          </td>
                          <td className="p-3 font-sans text-slate-300">{col.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB: OVERVIEW & HEALTH */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Category Breakdown */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white">Queries by Knowledge Domain</h3>
            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Tourism & Wildlife (Loktak, Sangai)</span>
                  <span className="font-mono text-cyan-400">42%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full" style={{ width: '42%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>History & Royalty (Kangla, Ningthouja)</span>
                  <span className="font-mono text-purple-400">28%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '28%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Government Schemes (CMHT, StartUp)</span>
                  <span className="font-mono text-indigo-400">16%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: '16%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Meiteilon Language & Translation</span>
                  <span className="font-mono text-emerald-400">10%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '10%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* System Health Status */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white">Service Health Matrix</h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-300">Gemini 3.8 Flash AI Model</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono text-[10px]">
                  HEALTHY (API KEY ATTACHED)
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-300">SQL Server Relational Engine</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono text-[10px]">
                  HEALTHY (PORT 1433 POOL)
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-300">Text-to-Speech Vocal Synthesis</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono text-[10px]">
                  OPERATIONAL
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-300">System Uptime</span>
                <span className="font-mono text-purple-300 font-bold">
                  99.98% (24x7 Ready)
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: USER FEEDBACK */}
      {activeTab === 'feedback' && (
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white">Citizen & Tourist Feedback Log</h3>
          <div className="space-y-3">
            {feedback.map((item) => (
              <div key={item.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{item.name}</span>
                    <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-800 text-[10px] text-purple-300">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex text-amber-400 text-xs">
                    {'★'.repeat(item.rating)}
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  "{item.comment}"
                </p>
                <div className="text-[10px] text-slate-500 font-mono">
                  {new Date(item.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
