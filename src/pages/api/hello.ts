import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
	const url = new URL(request.url);
	const locale = url.searchParams.get("locale") || "de";

	const timestamp = new Date().toLocaleString(
		locale === "de" ? "de-DE" : "en-US",
	);

	const messages = {
		de: `Hallo vom Server! Die aktuelle Zeit ist: ${timestamp}`,
		en: `Hello from the server! The current time is: ${timestamp}`,
	};

	const message = messages[locale as keyof typeof messages] || messages.de;

	// Return HTML fragment for HTMX
	return new Response(
		`<div class="animate-fade-in">
      <p class="text-success-600 font-semibold">${message}</p>
      <p class="text-sm text-gray-500 mt-2">This response was loaded via HTMX without a full page reload.</p>
    </div>`,
		{
			headers: {
				"Content-Type": "text/html",
			},
		},
	);
};
