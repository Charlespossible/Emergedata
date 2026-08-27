import { Helmet } from 'react-helmet-async';
import { SITE } from '@/config/site';
import { absoluteUrl, canonical } from '@/lib/seo';

type Props = {
  title: string;
  description: string;
  path: string;
  /** Absolute or root-relative image path. Defaults to the site OG image. */
  image?: string;
  /** JSON-LD objects to embed on this route. */
  jsonLd?: Record<string, unknown>[];
  noIndex?: boolean;
};

export function SEO({ title, description, path, image, jsonLd, noIndex }: Props) {
  const url = canonical(path);
  const ogImage = absoluteUrl(image ?? SITE.defaultSeo.ogImage);
  const fullTitle = path === '/' ? SITE.defaultSeo.defaultTitle : `${title} | ${SITE.name}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noIndex ? <meta name="robots" content="noindex,follow" /> : null}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_NG" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLd?.map((block, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
}
