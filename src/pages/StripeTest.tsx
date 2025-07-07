
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { useStripeTest } from '../hooks/useStripeTest';
import { Loader2, TestTube, Copy } from 'lucide-react';

export default function StripeTest() {
  const { testApi, isLoading, result, clearResult } = useStripeTest();
  const [testData, setTestData] = useState({
    customAmount: 1000,
    email: 'test@example.com',
    phone: '+33712345678'
  });

  const handleTest = () => {
    clearResult();
    testApi({
      customAmount: testData.customAmount,
      tempUserData: {
        email: testData.email,
        phone: testData.phone
      }
    });
  };

  const copyCurlCommand = () => {
    const curlCommand = `curl -X POST http://localhost:8080/api/create-checkout-session \\
  -H "Content-Type: application/json" \\
  -d '{
    "customAmount": ${testData.customAmount},
    "successUrl": "http://localhost:3000/dynasty/create",
    "cancelUrl": "http://localhost:3000/dynasty/payment",
    "tempUserData": {
      "email": "${testData.email}",
      "phone": "${testData.phone}"
    }
  }'`;

    navigator.clipboard.writeText(curlCommand);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TestTube className="h-5 w-5" />
              Test API Stripe Checkout
            </CardTitle>
            <CardDescription>
              Testez l'API de création de session Stripe avec des données personnalisées
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="amount">Montant (centimes)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={testData.customAmount}
                  onChange={(e) => setTestData(prev => ({ ...prev, customAmount: parseInt(e.target.value) || 1000 }))}
                />
              </div>
              <div>
                <Label htmlFor="email">Email de test</Label>
                <Input
                  id="email"
                  type="email"
                  value={testData.email}
                  onChange={(e) => setTestData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="phone">Téléphone de test</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={testData.phone}
                  onChange={(e) => setTestData(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleTest} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Test en cours...
                  </>
                ) : (
                  <>
                    <TestTube className="mr-2 h-4 w-4" />
                    Tester l'API
                  </>
                )}
              </Button>

              <Button variant="outline" onClick={copyCurlCommand}>
                <Copy className="mr-2 h-4 w-4" />
                Copier cURL
              </Button>
            </div>
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle className={result.success ? "text-green-600" : "text-red-600"}>
                {result.success ? "✅ Test réussi" : "❌ Test échoué"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {result.error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded">
                  <p className="text-red-800 font-medium">Erreur:</p>
                  <p className="text-red-700">{result.error}</p>
                </div>
              )}

              {result.data && (
                <div className="p-4 bg-green-50 border border-green-200 rounded">
                  <p className="text-green-800 font-medium">Données de réponse:</p>
                  <pre className="text-sm text-green-700 mt-2 whitespace-pre-wrap">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </div>
              )}

              <div className="p-4 bg-gray-50 border border-gray-200 rounded">
                <p className="font-medium mb-2">Logs détaillés:</p>
                <Textarea
                  value={result.logs.join('\n')}
                  readOnly
                  className="font-mono text-sm"
                  rows={10}
                />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
