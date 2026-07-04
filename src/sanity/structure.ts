import type { StructureResolver } from 'sanity/structure';

/**
 * Studio desk structure: singletons (Company info, UI text) are pinned as
 * single editable documents; the catalog types list normally.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Company info')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .title('UI text')
        .id('uiStrings')
        .child(S.document().schemaType('uiStrings').documentId('uiStrings')),
      S.divider(),
      S.documentTypeListItem('product').title('Products'),
      S.documentTypeListItem('project').title('Reference projects'),
      S.documentTypeListItem('approval').title('Approvals & certifications'),
      S.documentTypeListItem('client').title('Clients'),
      S.documentTypeListItem('brand').title('Brands'),
    ]);
