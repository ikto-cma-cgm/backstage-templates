-- Version: 1.0
-- Date: initial scaffold
-- Description: Initial schema creation for ${{ values.name }}

CREATE SCHEMA IF NOT EXISTS app;

CREATE TABLE IF NOT EXISTS app.sample (
    id              BIGSERIAL PRIMARY KEY,
    reference       VARCHAR(50)                                 NOT NULL,
    description     VARCHAR(255),
    created_by      VARCHAR(12)                                 NOT NULL,
    created_date    TIMESTAMP DEFAULT CURRENT_TIMESTAMP         NOT NULL,
    modified_by     VARCHAR(12)                                 NOT NULL,
    modified_date   TIMESTAMP DEFAULT CURRENT_TIMESTAMP         NOT NULL
);
