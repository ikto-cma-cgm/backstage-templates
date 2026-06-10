#!/usr/bin/env node
/**
 * Fetches the OpenAPI spec from the API entity repository.
 *
 * API entity : ${{ values.apiRef }}
 * Repo       : ${{ values.repoOwner }}/${{ values.apiEntityName }}
 *
 * Usage:
 *   npm run fetch-spec
 *
 * Required env vars (depending on provider):
 *   GITHUB_TOKEN  — Personal Access Token (GitHub)
 *   GITLAB_TOKEN  — Personal Access Token (GitLab)
 */

import { createWriteStream, mkdirSync } from 'fs';
import { Readable } from 'stream';
import { pipeline } from 'stream/promises';

const PROVIDER = '${{ values.repoProvider }}';
const REPO_OWNER = '${{ values.repoOwner }}';
const API_ENTITY = '${{ values.apiEntityName }}';
{%- if values.repoProvider == 'github' %}
const GITLAB_HOST = '';
{%- else %}
const GITLAB_HOST = '${{ values.gitlabHost }}';
{%- endif %}

const OUT = 'src/api/openapi.yaml';

function buildUrl() {
  if (PROVIDER === 'github') {
    return `https://raw.githubusercontent.com/${REPO_OWNER}/${API_ENTITY}/main/openapi.yaml`;
  }
  return `https://${GITLAB_HOST}/${REPO_OWNER}/${API_ENTITY}/-/raw/main/openapi.yaml`;
}

function buildHeaders() {
  if (PROVIDER === 'github') {
    const token = process.env.GITHUB_TOKEN;
    if (!token) throw new Error('GITHUB_TOKEN is required to fetch from a private GitHub repo');
    return { Authorization: `Bearer ${token}` };
  }
  const token = process.env.GITLAB_TOKEN;
  if (!token) throw new Error('GITLAB_TOKEN is required to fetch from a private GitLab repo');
  return { 'PRIVATE-TOKEN': token };
}

const url = buildUrl();
console.log(`Fetching OpenAPI spec from: ${url}`);

const res = await fetch(url, { headers: buildHeaders() });
if (!res.ok) throw new Error(`Failed to fetch spec: ${res.status} ${res.statusText}`);
if (!res.body) throw new Error('Response body is empty');

mkdirSync('src/api', { recursive: true });
// Readable.fromWeb converts the WHATWG ReadableStream (fetch API) to a Node.js Readable
await pipeline(Readable.fromWeb(res.body), createWriteStream(OUT));
console.log(`Spec written to ${OUT}`);
