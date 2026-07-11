export const checksums = {
  "projects_en": "v3.5.0--UlpX9U-jdpGlxkf5pEV1CLZuv1_jY44EMwsCHiexjKQ",
  "projects_es": "v3.5.0--H2gdYnYUInZD8pDc1Acxqgi6h1tZF9vzuoG3ySNUqP4",
  "experience_en": "v3.5.0--eqBLU0TP01vx1ziOit0Iwsbe9IxkNnkYwpWoqu-ED20",
  "experience_es": "v3.5.0--RiVQuHazpesppi9tsfWpfBlHTVtFDsrVPavV_FCX5-o",
  "blog_en": "v3.5.0--kbDsqWvATbWtUDJvSX8S0zrZWHlODQIGe_-LaxxN9vA",
  "blog_es": "v3.5.0--OAPZf29Mir4syZxI16fhYfje4upl6fPhGMvmjF6DYYM"
}
export const checksumsStructure = {
  "projects_en": "IGwVYii5wPZ36wk6H8cWPo_t1_ts_xlTPEw6K5jQhxI",
  "projects_es": "n-FoaISUtDS1VuBclY0Ok5DsoMBDrmcXhaqjAT8VHDQ",
  "experience_en": "033lVwkku-5mSDX1zZDa53jGi7SKXWgpL1EAfU93re0",
  "experience_es": "fbzfiFmhXUTsapNJfikW3T1zipKpZdZK8J-vIhjw83w",
  "blog_en": "WZmlMffXVfRYyOtvj9vwoGRXF4_CcOwXfdbF7WBB4mc",
  "blog_es": "2ZJ8fhjnfI2r5XoiKhTEjFcmC6HNJOGBuAEIDJezCmM"
}

export const tables = {
  "projects_en": "_content_projects_en",
  "projects_es": "_content_projects_es",
  "experience_en": "_content_experience_en",
  "experience_es": "_content_experience_es",
  "blog_en": "_content_blog_en",
  "blog_es": "_content_blog_es",
  "info": "_content_info"
}

export default {
  "projects_en": {
    "type": "page",
    "fields": {
      "id": "string",
      "title": "string",
      "architecture": "string",
      "body": "json",
      "category": "string",
      "challenge": "string",
      "company": "string",
      "description": "string",
      "extension": "string",
      "featured": "boolean",
      "meta": "json",
      "metrics": "json",
      "navigation": "json",
      "order": "number",
      "path": "string",
      "period": "string",
      "results": "string",
      "role": "string",
      "seo": "json",
      "stack": "json",
      "status": "string",
      "stem": "string"
    }
  },
  "projects_es": {
    "type": "page",
    "fields": {
      "id": "string",
      "title": "string",
      "architecture": "string",
      "body": "json",
      "category": "string",
      "challenge": "string",
      "company": "string",
      "description": "string",
      "extension": "string",
      "featured": "boolean",
      "meta": "json",
      "metrics": "json",
      "navigation": "json",
      "order": "number",
      "path": "string",
      "period": "string",
      "results": "string",
      "role": "string",
      "seo": "json",
      "stack": "json",
      "status": "string",
      "stem": "string"
    }
  },
  "experience_en": {
    "type": "page",
    "fields": {
      "id": "string",
      "title": "string",
      "body": "json",
      "company": "string",
      "description": "string",
      "extension": "string",
      "meta": "json",
      "navigation": "json",
      "order": "number",
      "path": "string",
      "period": "string",
      "projects": "json",
      "role": "string",
      "seo": "json",
      "stem": "string"
    }
  },
  "experience_es": {
    "type": "page",
    "fields": {
      "id": "string",
      "title": "string",
      "body": "json",
      "company": "string",
      "description": "string",
      "extension": "string",
      "meta": "json",
      "navigation": "json",
      "order": "number",
      "path": "string",
      "period": "string",
      "projects": "json",
      "role": "string",
      "seo": "json",
      "stem": "string"
    }
  },
  "blog_en": {
    "type": "page",
    "fields": {
      "id": "string",
      "title": "string",
      "body": "json",
      "date": "string",
      "description": "string",
      "draft": "boolean",
      "extension": "string",
      "meta": "json",
      "navigation": "json",
      "path": "string",
      "readingTime": "number",
      "seo": "json",
      "stem": "string",
      "tags": "json"
    }
  },
  "blog_es": {
    "type": "page",
    "fields": {
      "id": "string",
      "title": "string",
      "body": "json",
      "date": "string",
      "description": "string",
      "draft": "boolean",
      "extension": "string",
      "meta": "json",
      "navigation": "json",
      "path": "string",
      "readingTime": "number",
      "seo": "json",
      "stem": "string",
      "tags": "json"
    }
  },
  "info": {
    "type": "data",
    "fields": {}
  }
}