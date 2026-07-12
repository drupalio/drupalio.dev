export const checksums = {}
export const checksumsStructure = {}

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