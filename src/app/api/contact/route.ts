import { contactConfig, handleContact } from "@/lib/contact/server";
export const runtime = "nodejs";
export const maxDuration = 20;
export const dynamic = "force-dynamic";
export async function GET() {
  return Response.json({configured:!!contactConfig(process.env)},{headers:{"Cache-Control":"no-store"}});
}
export async function POST(request: Request) {
  return handleContact(request,process.env);
}
