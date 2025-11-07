import React, { useEffect, useState } from "react";
import { fetchContactMessages, ContactEntry, signInWithGoogle, signOutUser, onAuthChange } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAuthInstance } from "@/lib/firebase";
import { 
  getStoredMessages, 
  getAdminStats, 
  autoDownloadAdminExcel,
  clearOldMessages,
  StoredMessage 
} from "@/lib/admin-storage";

const formatDate = (ts: any) => {
  if (!ts) return "-";
  if (ts.seconds) return new Date(ts.seconds * 1000).toLocaleString();
  try {
    return new Date(ts).toLocaleString();
  } catch (_e) {
    return String(ts);
  }
};

function toCSV(rows: Array<{ id: string; data: ContactEntry }>) {
  const headers = ["id", "name", "email", "phone", "condition", "message", "createdAt"];
  const lines = [headers.join(",")];
  for (const r of rows) {
    const vals = [
      r.id,
      JSON.stringify(r.data.name || ""),
      JSON.stringify(r.data.email || ""),
      JSON.stringify(r.data.phone || ""),
      JSON.stringify(r.data.condition || ""),
      JSON.stringify(r.data.message || ""),
      JSON.stringify(formatDate(r.data.createdAt)),
    ];
    lines.push(vals.join(","));
  }
  return lines.join("\n");
}

const Admin = () => {
  const [rows, setRows] = useState<Array<{ id: string; data: ContactEntry }>>([]);
  const [localMessages, setLocalMessages] = useState<StoredMessage[]>([]);
  const [localStats, setLocalStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);

  // Load local storage data immediately
  useEffect(() => {
    refreshLocalData();
  }, []);

  const refreshLocalData = () => {
    const messages = getStoredMessages();
    const stats = getAdminStats();
    setLocalMessages(messages);
    setLocalStats(stats);
  };

  useEffect(() => {
    // subscribe to auth changes
    const unsub = onAuthChange((u) => {
      setUser(u);
    });
    return () => unsub && typeof unsub === "function" && unsub();
  }, []);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetchContactMessages()
      .then((r) => setRows(r))
      .catch((err) => setError(String(err)))
      .finally(() => setLoading(false));
  }, [user]);

  const downloadCSV = () => {
    const csv = toCSV(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contact-messages-${new Date().toISOString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadLocalCSV = () => {
    autoDownloadAdminExcel();
    alert(`Downloaded Excel file with ${localMessages.length} local contacts`);
  };

  const handleClearOld = () => {
    const deleted = clearOldMessages(30);
    refreshLocalData();
    alert(`Cleared ${deleted} old messages`);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">KeratoCare Admin Panel</h1>
            <div className="flex items-center gap-3">
              <Button onClick={refreshLocalData} variant="outline">
                Refresh Local Data
              </Button>
              <Button onClick={downloadLocalCSV} className="bg-green-600">
                Download Local Excel
              </Button>
            </div>
          </div>

          {/* Local Statistics */}
          {localStats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="p-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{localStats.total}</div>
                  <div className="text-sm text-muted-foreground">Total Local Contacts</div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{localStats.today}</div>
                  <div className="text-sm text-muted-foreground">Today</div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{localStats.thisWeek}</div>
                  <div className="text-sm text-muted-foreground">This Week</div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="text-center">
                  <Button onClick={handleClearOld} variant="destructive" size="sm">
                    Clear Old Messages
                  </Button>
                </div>
              </Card>
            </div>
          )}

          <Tabs defaultValue="local" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="local">Local Storage ({localMessages.length})</TabsTrigger>
              <TabsTrigger value="firebase">Firebase Database ({rows.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="local" className="space-y-4">
              <Card>
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Local Contact Messages</h3>
                    <div className="flex gap-2">
                      <Badge variant="secondary">{localMessages.length} messages</Badge>
                      {localStats?.topConditions && (
                        <div className="flex gap-1">
                          {localStats.topConditions.slice(0, 3).map(({ condition, count }: any) => (
                            <Badge key={condition} variant="outline" className="text-xs">
                              {condition}: {count}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Condition</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
                        </tr>
                      </thead>
                    <tbody className="divide-y divide-gray-200">
                      {localMessages.slice().reverse().map((message) => (
                        <tr key={message.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm">
                            <div>{new Date(message.timestamp).toLocaleDateString()}</div>
                            <div className="text-xs text-gray-500">
                              {new Date(message.timestamp).toLocaleTimeString()}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm font-medium">{message.name}</td>
                          <td className="px-4 py-4 text-sm text-gray-600">{message.email}</td>
                          <td className="px-4 py-4 text-sm">
                            <div className="space-y-1">
                              <a href={`tel:${message.phone}`} className="text-green-600 hover:underline block text-xs">
                                📞 {message.phone}
                              </a>
                              <a 
                                href={`https://wa.me/${message.phone.replace(/[^0-9]/g, '')}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-green-600 hover:underline block text-xs"
                              >
                                💬 WhatsApp
                              </a>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm">
                            <Badge variant="outline">{message.condition || 'Not specified'}</Badge>
                          </td>
                          <td className="px-4 py-4 text-sm max-w-xs truncate">
                            {message.message || 'No message'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {localMessages.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    No local messages found. Messages will appear here after form submissions.
                  </div>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="firebase" className="space-y-4">
              <Card>
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold">Firebase Database</h3>
                </div>

                {!user && (
                  <div className="p-6">
                    <p className="mb-4">You must sign in with Google to view Firebase submissions.</p>
                    <Button
                      onClick={async () => {
                        try {
                          await signInWithGoogle();
                        } catch (err) {
                          console.error(err);
                          setError(String(err));
                        }
                      }}
                    >
                      Sign in with Google
                    </Button>
                  </div>
                )}

                {user && (
                  <>
                    <div className="p-6 border-b flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">{rows.length} Firebase submissions</div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm">Signed in as {user.email}</div>
                        <Button
                          onClick={() => signOutUser().then(() => setUser(null))}
                          variant="outline"
                          size="sm"
                        >
                          Sign out
                        </Button>
                        <Button 
                          onClick={() => fetchContactMessages().then((r) => setRows(r))} 
                          variant="outline"
                          size="sm"
                        >
                          Refresh
                        </Button>
                        <Button onClick={downloadCSV} className="bg-secondary hover:bg-secondary/90" size="sm">
                          Download CSV
                        </Button>
                      </div>
                    </div>

                    {loading && <div className="p-6">Loading Firebase data...</div>}
                    {error && <div className="p-6 bg-red-50 text-red-700">Error: {error}</div>}

                    {!loading && !error && (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">When</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Condition</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {rows.map((r) => (
                              <tr key={r.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm">{formatDate(r.data.createdAt)}</td>
                                <td className="px-4 py-3 text-sm font-medium">{r.data.name}</td>
                                <td className="px-4 py-3 text-sm">{r.data.email}</td>
                                <td className="px-4 py-3 text-sm">{r.data.phone}</td>
                                <td className="px-4 py-3 text-sm">
                                  <Badge variant="outline">{r.data.condition || "-"}</Badge>
                                </td>
                                <td className="px-4 py-3 text-sm max-w-xl truncate">{r.data.message || "-"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {!loading && !error && rows.length === 0 && (
                      <div className="text-center py-12 text-gray-500">
                        No Firebase messages found.
                      </div>
                    )}
                  </>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;
