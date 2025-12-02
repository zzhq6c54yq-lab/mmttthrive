import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useSupportCircle } from "@/hooks/useSupportCircle";

const CreateCircle = ({ userId }: { userId?: string }) => {
  const [name, setName] = useState("My Support Circle");
  const { createCircle } = useSupportCircle(userId);

  return (
    <Card className="p-8 glass-card max-w-md mx-auto">
      <h2 className="text-2xl font-bold gradient-heading mb-6">Create Your Support Circle</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Circle Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
        </div>
        <Button onClick={() => createCircle.mutate(name)} className="w-full" disabled={createCircle.isPending}>
          {createCircle.isPending ? "Creating..." : "Create Circle"}
        </Button>
      </div>
    </Card>
  );
};

export default CreateCircle;
