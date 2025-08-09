import SEO from "@/components/SEO";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart, Legend } from "recharts";

const data = [
  { time: "08:00", bgl: 105, insulin: 0 },
  { time: "10:00", bgl: 140, insulin: 1.2 },
  { time: "12:00", bgl: 180, insulin: 0 },
  { time: "14:00", bgl: 150, insulin: 1.0 },
  { time: "16:00", bgl: 120, insulin: 0 },
  { time: "18:00", bgl: 160, insulin: 2.1 },
  { time: "20:00", bgl: 130, insulin: 0 },
];

export default function History() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "Glucose & Insulin Trends",
    "description": "Demo chart showing glucose and insulin trends",
  };

  return (
    <>
      <SEO title="History & Trends • GlucoLoop" description="View daily glucose, insulin, and activity trends." canonical={window.location.href} jsonLd={jsonLd} />
      <Navbar />
      <main className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle>History & Trends</CardTitle>
            <CardDescription>Track BGL and insulin units over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="bgl" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                  <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" />
                  <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                  <Legend />
                  <Area yAxisId="left" type="monotone" dataKey="bgl" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#bgl)" name="BGL" />
                  <Line yAxisId="right" type="monotone" dataKey="insulin" stroke="hsl(var(--accent-foreground))" name="Insulin (u)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
