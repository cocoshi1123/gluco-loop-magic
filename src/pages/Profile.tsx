import { useEffect, useState } from "react";
import SEO from "@/components/SEO";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProfileData {
  type: "t1" | "t2";
  age: number;
  weightKg: number;
  carbRatio: number;
  correctionFactor: number;
  mode: "pump" | "injection";
}

export default function Profile() {
  const [profile, setProfile] = useState<ProfileData>({
    type: "t1",
    age: 16,
    weightKg: 55,
    carbRatio: 10,
    correctionFactor: 50,
    mode: "injection",
  });

  useEffect(() => {
    const saved = localStorage.getItem("gl_profile");
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("gl_profile", JSON.stringify(profile));
  }, [profile]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "name": "User Profile",
  };

  return (
    <>
      <SEO title="Profile • GlucoLoop" description="Configure your insulin sensitivity, carb ratio, and delivery mode." canonical={window.location.href} jsonLd={jsonLd} />
      <Navbar />
      <main className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
            <CardDescription>These values tune your dose suggestions.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Type</Label>
              <Select value={profile.type} onValueChange={(v: any) => setProfile((p) => ({ ...p, type: v }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="t1">Type 1</SelectItem>
                  <SelectItem value="t2">Type 2 (insulin-dependent)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input id="age" type="number" min={1} value={profile.age} onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })} />
            </div>
            <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input id="weight" type="number" min={1} value={profile.weightKg} onChange={(e) => setProfile({ ...profile, weightKg: Number(e.target.value) })} />
            </div>
            <div>
              <Label htmlFor="ratio">Carb Ratio (g/u)</Label>
              <Input id="ratio" type="number" min={1} value={profile.carbRatio} onChange={(e) => setProfile({ ...profile, carbRatio: Number(e.target.value) })} />
            </div>
            <div>
              <Label htmlFor="cf">Correction Factor (mg/dL per u)</Label>
              <Input id="cf" type="number" min={1} value={profile.correctionFactor} onChange={(e) => setProfile({ ...profile, correctionFactor: Number(e.target.value) })} />
            </div>
            <div>
              <Label>Mode</Label>
              <Select value={profile.mode} onValueChange={(v: any) => setProfile((p) => ({ ...p, mode: v }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pump">Pump</SelectItem>
                  <SelectItem value="injection">Injection</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
