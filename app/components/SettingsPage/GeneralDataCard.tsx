import prisma from "@/app/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { unstable_noStore as noStore } from "next/cache";
import { SubmitButtons } from "../SubmitButtons";

export default function InformationCard({
  data,
  user,
}: {
  data: any;
  user: any;
}) {
  async function postData(formData: FormData) {
    ("use server");
    noStore();
    const name = formData.get("name") as string;
    await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        name: name ?? undefined,
      },
    });
  }
  return (
    <main className="pt-8 sm:pt-10 pb-16 container mx-auto max-w-6xl px-5 mb-32 sm:mb-0">
      <div className="grid items-start gap-8">
        <div className="flex items-center justify-between px-2">
          <div className="grid gap-1">
            <h1 className="text-3xl md:text-4xl font-semibold">Settings</h1>
            <p className="text-lg text-muted-foreground">
              Manage your account settings
            </p>
          </div>
        </div>
      </div>
      <Card className="mt-5">
        <form action={postData}>
          <CardHeader>
            <CardTitle>General Data</CardTitle>
            <CardDescription>
              Please provide general information about yourself. Please dont
              please to save.
            </CardDescription>
            <CardContent>
              <div className="space-y-2">
                <div className="space-y-1">
                  <Label>Your name</Label>
                  <Input
                    name="name"
                    type="text"
                    id="name"
                    placeholder="Your Name"
                    defaultValue={data?.name ?? ("" as string)}
                  />
                </div>
                <div className="space-y-1">
                  <Label>Your Email</Label>
                  <Input
                    name="email"
                    type="email"
                    id="email"
                    placeholder="Your Email"
                    disabled
                    defaultValue={data?.email}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <SubmitButtons message="Save Now" variation="secondary" />
            </CardFooter>
          </CardHeader>
        </form>
      </Card>
    </main>
  );
}
