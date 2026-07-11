declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"editions": {
"inner-table-1.md": {
	id: "inner-table-1.md";
  slug: "inner-table-1";
  body: string;
  collection: "editions";
  data: InferEntrySchema<"editions">
} & { render(): Render[".md"] };
"inner-table-2.md": {
	id: "inner-table-2.md";
  slug: "inner-table-2";
  body: string;
  collection: "editions";
  data: InferEntrySchema<"editions">
} & { render(): Render[".md"] };
"inner-table-3.md": {
	id: "inner-table-3.md";
  slug: "inner-table-3";
  body: string;
  collection: "editions";
  data: InferEntrySchema<"editions">
} & { render(): Render[".md"] };
"threshold-1.md": {
	id: "threshold-1.md";
  slug: "threshold-1";
  body: string;
  collection: "editions";
  data: InferEntrySchema<"editions">
} & { render(): Render[".md"] };
"threshold-2.md": {
	id: "threshold-2.md";
  slug: "threshold-2";
  body: string;
  collection: "editions";
  data: InferEntrySchema<"editions">
} & { render(): Render[".md"] };
"threshold-3.md": {
	id: "threshold-3.md";
  slug: "threshold-3";
  body: string;
  collection: "editions";
  data: InferEntrySchema<"editions">
} & { render(): Render[".md"] };
"unfinished-conversations-1.md": {
	id: "unfinished-conversations-1.md";
  slug: "unfinished-conversations-1";
  body: string;
  collection: "editions";
  data: InferEntrySchema<"editions">
} & { render(): Render[".md"] };
"unfinished-conversations-2.md": {
	id: "unfinished-conversations-2.md";
  slug: "unfinished-conversations-2";
  body: string;
  collection: "editions";
  data: InferEntrySchema<"editions">
} & { render(): Render[".md"] };
"unfinished-conversations-3.md": {
	id: "unfinished-conversations-3.md";
  slug: "unfinished-conversations-3";
  body: string;
  collection: "editions";
  data: InferEntrySchema<"editions">
} & { render(): Render[".md"] };
};
"events": {
"01-january-gathering.md": {
	id: "01-january-gathering.md";
  slug: "01-january-gathering";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"02-january-conversation.md": {
	id: "02-january-conversation.md";
  slug: "02-january-conversation";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"03-threshold-—-new-year.md": {
	id: "03-threshold-—-new-year.md";
  slug: "03-threshold--new-year";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"04-february-table.md": {
	id: "04-february-table.md";
  slug: "04-february-table";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"05-february-conversation.md": {
	id: "05-february-conversation.md";
  slug: "05-february-conversation";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"06-threshold-—-lent.md": {
	id: "06-threshold-—-lent.md";
  slug: "06-threshold--lent";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"07-march-table.md": {
	id: "07-march-table.md";
  slug: "07-march-table";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
"08-march-conversation.md": {
	id: "08-march-conversation.md";
  slug: "08-march-conversation";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".md"] };
};
"galleries": Record<string, {
  id: string;
  slug: string;
  body: string;
  collection: "galleries";
  data: InferEntrySchema<"galleries">;
  render(): Render[".md"];
}>;

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("./../../src/content/config.js");
}
