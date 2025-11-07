import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Users, 
  Calendar, 
  TrendingUp, 
  Mail, 
  Phone,
  Trash2,
  RefreshCw
} from 'lucide-react';
import {
  getStoredMessages,
  getAdminStats,
  autoDownloadAdminExcel,
  clearOldMessages,
  StoredMessage
} from '@/lib/admin-storage';

const AdminPanel = () => {
  const [messages, setMessages] = useState<StoredMessage[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isAuthed, setIsAuthed] = useState(false);
  const [password, setPassword] = useState('');

  const ADMIN_PASSWORD = 'keratocare2025'; // Change this to your preferred password

  useEffect(() => {
    if (isAuthed) {
      refreshData();
    }
  }, [isAuthed]);

  const refreshData = () => {
    const allMessages = getStoredMessages();
    setMessages(allMessages);
    setStats(getAdminStats());
  };

  const handleAuth = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthed(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleDownload = () => {
    autoDownloadAdminExcel();
    alert(`Downloaded Excel file with ${messages.length} contacts`);
  };

  const handleClearOld = () => {
    const deleted = clearOldMessages(30);
    refreshData();
    alert(`Cleared ${deleted} old messages`);
  };

  if (!isAuthed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6">KeratoCare Admin</h2>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
              className="w-full px-3 py-2 border rounded-lg"
            />
            <Button onClick={handleAuth} className="w-full">
              Access Admin Panel
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">KeratoCare Admin Panel</h1>
          <div className="flex space-x-3">
            <Button onClick={refreshData} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={handleDownload} className="bg-green-600">
              <Download className="w-4 h-4 mr-2" />
              Download Excel
            </Button>
            <Button onClick={handleClearOld} variant="destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Old
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Total Contacts</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-green-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Today</p>
                  <p className="text-2xl font-bold">{stats.today}</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-orange-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">This Week</p>
                  <p className="text-2xl font-bold">{stats.thisWeek}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center">
                <Mail className="w-8 h-8 text-purple-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Latest Message</p>
                  <p className="text-sm font-medium">
                    {stats.latestMessage ? 
                      new Date(stats.latestMessage.timestamp).toLocaleDateString() : 
                      'No messages'
                    }
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Top Conditions */}
        {stats?.topConditions && (
          <Card className="p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Top Conditions</h3>
            <div className="flex flex-wrap gap-2">
              {stats.topConditions.map(({ condition, count }: any) => (
                <Badge key={condition} variant="secondary">
                  {condition}: {count}
                </Badge>
              ))}
            </div>
          </Card>
        )}

        {/* Messages Table */}
        <Card className="overflow-hidden">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold">All Contact Messages</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Condition
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Message
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {messages.slice().reverse().map((message) => (
                  <tr key={message.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(message.timestamp).toLocaleDateString()}
                      <br />
                      <span className="text-xs text-gray-500">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{message.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex flex-col space-y-1">
                        <a 
                          href={`mailto:${message.email}`}
                          className="text-blue-600 hover:underline flex items-center"
                        >
                          <Mail className="w-3 h-3 mr-1" />
                          {message.email}
                        </a>
                        <a 
                          href={`tel:${message.phone}`}
                          className="text-green-600 hover:underline flex items-center"
                        >
                          <Phone className="w-3 h-3 mr-1" />
                          {message.phone}
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="outline">
                        {message.condition || 'Not specified'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                      {message.message || 'No message'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {messages.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No messages found. Contacts will appear here after form submissions.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;