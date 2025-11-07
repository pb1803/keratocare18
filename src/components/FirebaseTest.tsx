import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { addContactMessage } from "@/lib/firebase";

const FirebaseTest = () => {
  const [testResult, setTestResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const testFirebase = async () => {
    setIsLoading(true);
    setTestResult("Testing Firebase connection...");
    
    try {
      console.log("🔄 Starting Firebase test...");
      
      const testData = {
        name: "Test User",
        email: "test@test.com", 
        phone: "1234567890",
        condition: "Test",
        message: "This is a test message",
      };

      console.log("🔄 Attempting to add document...");
      const docId = await addContactMessage(testData);
      
      console.log("✅ Success! Document ID:", docId);
      setTestResult(`✅ SUCCESS! Document created with ID: ${docId}`);
      
    } catch (error: any) {
      console.error("❌ Firebase test failed:", error);
      console.error("Error code:", error?.code);
      console.error("Error message:", error?.message);
      console.error("Error details:", error);
      
      let errorDetail = "";
      if (error?.code === 'permission-denied') {
        errorDetail = "❌ FIRESTORE SECURITY RULES ISSUE - Database doesn't allow writes from unauthenticated users";
      } else if (error?.code === 'unavailable') {
        errorDetail = "❌ FIREBASE SERVICE UNAVAILABLE - Network or server issue";
      } else if (error?.message?.includes('timeout')) {
        errorDetail = "❌ CONNECTION TIMEOUT - Network too slow or blocked";
      } else {
        errorDetail = `❌ ERROR: ${error?.code || 'Unknown'} - ${error?.message || 'Unknown error'}`;
      }
      
      setTestResult(errorDetail);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 m-4 max-w-2xl mx-auto">
      <h3 className="text-xl font-bold mb-4">🔥 Firebase Debug Test</h3>
      
      <Button 
        onClick={testFirebase} 
        disabled={isLoading}
        className="mb-4"
      >
        {isLoading ? "Testing..." : "Test Firebase Connection"}
      </Button>
      
      {testResult && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <pre className="text-sm whitespace-pre-wrap">{testResult}</pre>
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-600">
        <p><strong>Check browser console (F12) for detailed logs.</strong></p>
      </div>
    </Card>
  );
};

export default FirebaseTest;