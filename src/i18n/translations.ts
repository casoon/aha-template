export type Locale = "de" | "en";

export const translations: Record<Locale, Record<string, string>> = {
	de: {
		appName: "AHA Template",
		tagline: "Astro + HTMX + Alpine.js",
		home: "Startseite",
		examples: "Beispiele",
		language: "Sprache",
		submit: "Absenden",
		cancel: "Abbrechen",
		save: "Speichern",
		delete: "Löschen",
		edit: "Bearbeiten",
		loading: "Laden...",
		success: "Erfolgreich!",
		error: "Fehler",
		welcome: "Willkommen",
		welcomeMessage:
			"Dies ist ein AHA-Stack Template mit Skibidoo-UI Komponenten.",
		gridExample: "Grid Beispiel",
		formExample: "Formular Beispiel",
		htmxExample: "HTMX Beispiel",
		alpineExample: "Alpine.js Beispiel",
		name: "Name",
		email: "E-Mail",
		message: "Nachricht",
		send: "Senden",
		actions: "Aktionen",
		status: "Status",
		active: "Aktiv",
		inactive: "Inaktiv",
	},
	en: {
		appName: "AHA Template",
		tagline: "Astro + HTMX + Alpine.js",
		home: "Home",
		examples: "Examples",
		language: "Language",
		submit: "Submit",
		cancel: "Cancel",
		save: "Save",
		delete: "Delete",
		edit: "Edit",
		loading: "Loading...",
		success: "Success!",
		error: "Error",
		welcome: "Welcome",
		welcomeMessage:
			"This is an AHA-Stack template with Skibidoo-UI components.",
		gridExample: "Grid Example",
		formExample: "Form Example",
		htmxExample: "HTMX Example",
		alpineExample: "Alpine.js Example",
		name: "Name",
		email: "Email",
		message: "Message",
		send: "Send",
		actions: "Actions",
		status: "Status",
		active: "Active",
		inactive: "Inactive",
	},
};

export function t(
	locale: Locale,
	key: string,
	params?: Record<string, string | number>,
): string {
	let text = translations[locale]?.[key] || translations.de[key] || key;

	if (params) {
		for (const [param, value] of Object.entries(params)) {
			text = text.replace(`{${param}}`, String(value));
		}
	}

	return text;
}

export function getLocaleFromUrl(url: URL): Locale {
	const [, locale] = url.pathname.split("/");
	if (locale === "en") return "en";
	return "de";
}

export function getLocalizedPath(path: string, locale: Locale): string {
	const cleanPath = path.replace(/^\/(de|en)/, "") || "/";
	if (locale === "de") return cleanPath;
	return `/${locale}${cleanPath === "/" ? "" : cleanPath}`;
}
