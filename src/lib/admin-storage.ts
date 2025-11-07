// Admin Excel export system - silent background storage
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  condition?: string;
  message?: string;
}

export interface StoredMessage extends ContactFormData {
  id: string;
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
}

// Silent storage function - doesn't notify user
export function storeMessageSilently(data: ContactFormData): StoredMessage {
  const timestamp = new Date().toISOString();
  const id = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const storedMessage: StoredMessage = {
    ...data,
    id,
    timestamp,
    ipAddress: 'Not available', // Would need server-side to get real IP
    userAgent: navigator.userAgent
  };
  
  try {
    const existingMessages = getStoredMessages();
    existingMessages.push(storedMessage);
    localStorage.setItem('keratocare_admin_messages', JSON.stringify(existingMessages));
    
    // Also store in a backup location
    localStorage.setItem(`keratocare_msg_${id}`, JSON.stringify(storedMessage));
    
    console.log('📝 Admin: Message stored silently:', id);
    return storedMessage;
  } catch (error) {
    console.error('❌ Admin: Failed to store message:', error);
    return storedMessage;
  }
}

// Get all stored messages (admin only)
export function getStoredMessages(): StoredMessage[] {
  try {
    const messages = localStorage.getItem('keratocare_admin_messages');
    return messages ? JSON.parse(messages) : [];
  } catch (error) {
    console.error('Failed to retrieve stored messages:', error);
    return [];
  }
}

// Generate CSV for admin download
export function generateAdminCSV(): string {
  const messages = getStoredMessages();
  
  const headers = [
    'ID', 'Timestamp', 'Name', 'Email', 'Phone', 'Condition', 'Message', 'User Agent'
  ];
  
  const escapeCSV = (value: string) => {
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value || '';
  };
  
  const csvRows = messages.map(msg => [
    msg.id,
    new Date(msg.timestamp).toLocaleString(),
    msg.name,
    msg.email,
    msg.phone,
    msg.condition || 'Not specified',
    msg.message || 'No message',
    msg.userAgent || 'Unknown'
  ].map(escapeCSV).join(','));
  
  return headers.join(',') + '\n' + csvRows.join('\n');
}

// Auto-download Excel for admin (silent)
export function autoDownloadAdminExcel(): void {
  const csvContent = generateAdminCSV();
  const messages = getStoredMessages();
  
  if (messages.length === 0) return;
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  const filename = `keratocare-admin-contacts-${timestamp}.csv`;
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log(`📊 Admin: Auto-downloaded ${filename} with ${messages.length} messages`);
  }
}

// Generate WhatsApp message for user
export function generateWhatsAppMessage(data: ContactFormData): string {
  return `Hi KeratoCare! 👋

I'm interested in your services:

👤 Name: ${data.name}
📧 Email: ${data.email}
📞 Phone: ${data.phone}
🏥 Condition: ${data.condition || 'Not specified'}

${data.message ? `💬 Message: ${data.message}` : ''}

Please contact me for consultation.

Thank you!`;
}

// Clear old messages (admin maintenance)
export function clearOldMessages(daysOld: number = 30): number {
  const messages = getStoredMessages();
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysOld);
  
  const recentMessages = messages.filter(msg => 
    new Date(msg.timestamp) > cutoffDate
  );
  
  const deletedCount = messages.length - recentMessages.length;
  
  localStorage.setItem('keratocare_admin_messages', JSON.stringify(recentMessages));
  
  console.log(`🧹 Admin: Cleared ${deletedCount} messages older than ${daysOld} days`);
  return deletedCount;
}

// Admin statistics
export function getAdminStats() {
  const messages = getStoredMessages();
  const today = new Date().toDateString();
  const thisWeek = new Date();
  thisWeek.setDate(thisWeek.getDate() - 7);
  
  return {
    total: messages.length,
    today: messages.filter(m => new Date(m.timestamp).toDateString() === today).length,
    thisWeek: messages.filter(m => new Date(m.timestamp) > thisWeek).length,
    topConditions: getTopConditions(messages),
    latestMessage: messages[messages.length - 1]
  };
}

function getTopConditions(messages: StoredMessage[]) {
  const conditions: { [key: string]: number } = {};
  messages.forEach(m => {
    const condition = m.condition || 'Not specified';
    conditions[condition] = (conditions[condition] || 0) + 1;
  });
  
  return Object.entries(conditions)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([condition, count]) => ({ condition, count }));
}