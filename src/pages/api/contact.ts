import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
	const formData = await request.formData();
	const name = formData.get("name")?.toString() || "";
	const email = formData.get("email")?.toString() || "";
	const category = formData.get("category")?.toString() || "general";
	const message = formData.get("message")?.toString() || "";
	const newsletter = formData.get("newsletter") === "on";

	// Simulate processing delay
	await new Promise((resolve) => setTimeout(resolve, 500));

	// Simple validation
	if (!name || !email) {
		return new Response(
			`<div class="feedback-error animate-fade-in">
        <p>Please fill in all required fields.</p>
      </div>`,
			{
				status: 400,
				headers: { "Content-Type": "text/html" },
			},
		);
	}

	// Return success HTML fragment for HTMX
	return new Response(
		`<div class="feedback-success animate-fade-in">
      <p class="font-semibold mb-2">Message received!</p>
      <ul class="text-sm space-y-1">
        <li><strong>Name:</strong> ${escapeHtml(name)}</li>
        <li><strong>Email:</strong> ${escapeHtml(email)}</li>
        <li><strong>Category:</strong> ${escapeHtml(category)}</li>
        ${message ? `<li><strong>Message:</strong> ${escapeHtml(message.substring(0, 50))}${message.length > 50 ? "..." : ""}</li>` : ""}
        <li><strong>Newsletter:</strong> ${newsletter ? "Yes" : "No"}</li>
      </ul>
    </div>`,
		{
			headers: {
				"Content-Type": "text/html",
				"HX-Trigger": "formSubmitted",
			},
		},
	);
};

function escapeHtml(text: string): string {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}
