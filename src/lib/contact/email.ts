import type { ContactFields } from "./schema.ts";

// Email clients need inline styles and table layout; no remote fonts, images or scripts.
const stamps = {
  star: { symbol: "☆", label: "Star", color: "#315BD9", ink: "#fffdf7" },
  heart: { symbol: "♡", label: "Heart", color: "#ED694B", ink: "#252520" },
  bolt: { symbol: "ϟ", label: "Lightning", color: "#F5D77E", ink: "#252520" },
} as const;

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!);
}

export function postcardEmail(data: ContactFields): { html: string; text: string } {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const message = escapeHtml(data.message).replace(/\r\n?|\n/g, "<br />");
  const replyUrl = escapeHtml(`mailto:${encodeURIComponent(data.email)}`);
  const stamp = stamps[data.stamp];
  return {
    text: `A postcard from The Internet Scrapbook\n\nDear Siddhesh,\n\n${data.message}\n\nWith love (or good intentions),\n${data.name}\nReply to: ${data.email}\nStamp: ${stamp.label}\n\nUse Reply to write back to the visitor.`,
    html: `<!doctype html>
<html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><meta name="color-scheme" content="light" /><title>A postcard from The Internet Scrapbook</title>
<style>@media only screen and (max-width:600px){.email-surround{padding:16px 8px!important}.paper-padding{padding:24px 20px!important}.sender-cell{display:block!important;width:100%!important;box-sizing:border-box!important;padding:12px 0!important;border-left:0!important}.card-title{font-size:24px!important}}</style></head>
<body style="margin:0;padding:0;background-color:#F6F2E9;color:#252520;font-family:Arial,Helvetica,sans-serif;">
<div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">A little note from ${name}. A new connection from your corner of the internet.</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#F6F2E9;"><tr><td class="email-surround" align="center" style="padding:40px 16px;">
<!--[if mso]><table role="presentation" width="640"><tr><td><![endif]-->
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:640px;">
<tr><td style="padding:0 4px 18px;font-family:'Courier New',monospace;font-size:11px;line-height:18px;letter-spacing:1px;color:#62625a;">THE INTERNET SCRAPBOOK &nbsp;/&nbsp; PERSONAL POST</td></tr>
<tr><td class="paper-padding" style="padding:32px 36px;background-color:#fffdf7;border:1px solid #d4d0c4;border-bottom:4px solid #e9dfbf;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr>
<td valign="top" style="padding:6px 12px 0 0;"><p style="font-family:'Courier New',monospace;font-size:11px;line-height:18px;letter-spacing:2px;margin:0 0 14px;color:#62625a;">POST CARD / NO. 05</p><h1 class="card-title" style="font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:38px;font-weight:normal;font-style:italic;color:#315BD9;margin:0;">Dear Siddhesh,</h1></td>
<td width="80" align="right" valign="top"><table role="presentation" width="72" cellspacing="0" cellpadding="0" border="0" style="border:3px dashed ${stamp.color};"><tr><td align="center" style="padding:5px;background-color:${stamp.color};color:${stamp.ink};border:3px solid #fffdf7;"><span aria-hidden="true" style="font-family:Georgia,serif;font-size:38px;line-height:42px;">${stamp.symbol}</span><br /><span style="font-family:'Courier New',monospace;font-size:9px;line-height:16px;">${stamp.label.toUpperCase()}<br />SG / POST</span></td></tr></table></td>
</tr></table>
<p style="font-family:'Courier New',monospace;font-size:10px;line-height:18px;letter-spacing:1px;color:#62625a;margin:32px 0 12px;">A NOTE FROM YOUR CORNER OF THE INTERNET</p>
<div style="font-size:18px;line-height:32px;color:#315BD9;overflow-wrap:anywhere;word-wrap:break-word;word-break:break-word;white-space:normal;border-top:1px solid #e3e8f7;border-bottom:1px solid #e3e8f7;padding:20px 0 28px;">${message}</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;margin-top:26px;"><tr>
<td class="sender-cell" width="50%" valign="top" style="padding:0 20px 0 0;"><p style="font-size:12px;line-height:20px;color:#62625a;margin:0 0 6px;">With love (or good intentions),</p><p style="font-size:16px;line-height:25px;margin:0;overflow-wrap:anywhere;word-break:break-word;">${name}</p></td>
<td class="sender-cell" width="50%" valign="top" style="padding:0 0 0 20px;border-left:1px solid #d4d0c4;"><p style="font-size:12px;line-height:20px;color:#62625a;margin:0 0 6px;">Where you can write back</p><a href="${replyUrl}" style="font-size:14px;line-height:25px;color:#315BD9;text-decoration:underline;overflow-wrap:anywhere;word-break:break-word;">${email}</a></td>
</tr></table>
<p style="font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:25px;font-style:italic;color:#315BD9;margin:30px 0 0;">PS. The internet feels smaller when we say hello.</p>
</td></tr>
<tr><td align="center" style="padding:22px 12px 0;"><p style="font-size:12px;line-height:20px;color:#62625a;margin:0;">A small note. A new connection.</p><p style="font-family:'Courier New',monospace;font-size:10px;line-height:18px;color:#62625a;margin:8px 0 0;">Use Reply to write back to the visitor.</p></td></tr>
</table><!--[if mso]></td></tr></table><![endif]-->
</td></tr></table></body></html>`,
  };
}
