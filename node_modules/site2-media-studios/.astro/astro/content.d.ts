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
		"films": {
"northwind.md": {
	id: "northwind.md";
  slug: "northwind";
  body: string;
  collection: "films";
  data: InferEntrySchema<"films">
} & { render(): Render[".md"] };
"return.md": {
	id: "return.md";
  slug: "return";
  body: string;
  collection: "films";
  data: InferEntrySchema<"films">
} & { render(): Render[".md"] };
"the-inner-table.md": {
	id: "the-inner-table.md";
  slug: "the-inner-table";
  body: string;
  collection: "films";
  data: InferEntrySchema<"films">
} & { render(): Render[".md"] };
"the-long-field.md": {
	id: "the-long-field.md";
  slug: "the-long-field";
  body: string;
  collection: "films";
  data: InferEntrySchema<"films">
} & { render(): Render[".md"] };
"threshold.md": {
	id: "threshold.md";
  slug: "threshold";
  body: string;
  collection: "films";
  data: InferEntrySchema<"films">
} & { render(): Render[".md"] };
"unfinished-conversations.md": {
	id: "unfinished-conversations.md";
  slug: "unfinished-conversations";
  body: string;
  collection: "films";
  data: InferEntrySchema<"films">
} & { render(): Render[".md"] };
};
"podcasts": {
"ep01.md": {
	id: "ep01.md";
  slug: "ep01";
  body: string;
  collection: "podcasts";
  data: InferEntrySchema<"podcasts">
} & { render(): Render[".md"] };
"ep02.md": {
	id: "ep02.md";
  slug: "ep02";
  body: string;
  collection: "podcasts";
  data: InferEntrySchema<"podcasts">
} & { render(): Render[".md"] };
"ep03.md": {
	id: "ep03.md";
  slug: "ep03";
  body: string;
  collection: "podcasts";
  data: InferEntrySchema<"podcasts">
} & { render(): Render[".md"] };
"ep04.md": {
	id: "ep04.md";
  slug: "ep04";
  body: string;
  collection: "podcasts";
  data: InferEntrySchema<"podcasts">
} & { render(): Render[".md"] };
"ep05.md": {
	id: "ep05.md";
  slug: "ep05";
  body: string;
  collection: "podcasts";
  data: InferEntrySchema<"podcasts">
} & { render(): Render[".md"] };
"ep06.md": {
	id: "ep06.md";
  slug: "ep06";
  body: string;
  collection: "podcasts";
  data: InferEntrySchema<"podcasts">
} & { render(): Render[".md"] };
"ep07.md": {
	id: "ep07.md";
  slug: "ep07";
  body: string;
  collection: "podcasts";
  data: InferEntrySchema<"podcasts">
} & { render(): Render[".md"] };
"ep08.md": {
	id: "ep08.md";
  slug: "ep08";
  body: string;
  collection: "podcasts";
  data: InferEntrySchema<"podcasts">
} & { render(): Render[".md"] };
"ep09.md": {
	id: "ep09.md";
  slug: "ep09";
  body: string;
  collection: "podcasts";
  data: InferEntrySchema<"podcasts">
} & { render(): Render[".md"] };
"ep10.md": {
	id: "ep10.md";
  slug: "ep10";
  body: string;
  collection: "podcasts";
  data: InferEntrySchema<"podcasts">
} & { render(): Render[".md"] };
"ep11.md": {
	id: "ep11.md";
  slug: "ep11";
  body: string;
  collection: "podcasts";
  data: InferEntrySchema<"podcasts">
} & { render(): Render[".md"] };
"ep12.md": {
	id: "ep12.md";
  slug: "ep12";
  body: string;
  collection: "podcasts";
  data: InferEntrySchema<"podcasts">
} & { render(): Render[".md"] };
};
"press": {
"01-quiet-cinema-quarterly.md": {
	id: "01-quiet-cinema-quarterly.md";
  slug: "01-quiet-cinema-quarterly";
  body: string;
  collection: "press";
  data: InferEntrySchema<"press">
} & { render(): Render[".md"] };
"02-the-editorial-review.md": {
	id: "02-the-editorial-review.md";
  slug: "02-the-editorial-review";
  body: string;
  collection: "press";
  data: InferEntrySchema<"press">
} & { render(): Render[".md"] };
"03-festival-dispatch.md": {
	id: "03-festival-dispatch.md";
  slug: "03-festival-dispatch";
  body: string;
  collection: "press";
  data: InferEntrySchema<"press">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("./../../src/content/config.js");
}
