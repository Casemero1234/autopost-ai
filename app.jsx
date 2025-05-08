import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AutoPostAI() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateContent = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://ia-backend-brt5.onrender.com/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ texte: input }),
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Erreur de génération :", error);
      setResult({ erreur: "Échec de la génération." });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold text-center">🚀 AutoPost AI</h1>
      <p className="text-center text-gray-600">
        Colle un texte, clique, génère Résumé + Post + Plan en 3 sec.
      </p>
      <Textarea
        placeholder="Colle ton contenu ici..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="min-h-[150px]"
      />
      <Button onClick={generateContent} disabled={loading || !input} className="w-full">
        {loading ? "Génération en cours..." : "✨ Générer avec AutoPost AI"}
      </Button>

      {result && (
        <div className="space-y-4">
          {result.résumé && (
            <Card>
              <CardContent className="p-4">
                <h2 className="font-semibold mb-2">🧠 Résumé</h2>
                <pre className="whitespace-pre-wrap text-sm">{result.résumé}</pre>
              </CardContent>
            </Card>
          )}
          {result.post && (
            <Card>
              <CardContent className="p-4">
                <h2 className="font-semibold mb-2">✍️ Post LinkedIn</h2>
                <pre className="whitespace-pre-wrap text-sm">{result.post}</pre>
              </CardContent>
            </Card>
          )}
          {result.plan && (
            <Card>
              <CardContent className="p-4">
                <h2 className="font-semibold mb-2">📋 Plan de publication</h2>
                <pre className="whitespace-pre-wrap text-sm">{result.plan}</pre>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
y

