[Integrations](https://parallel.ai/integrations)

# Use Parallel with Snowflake

Call Parallel from Snowflake SQL with a UDTF to enrich rows with current web data.

[View Snowflake setup](https://docs.parallel.ai/data-integrations/overview)[Get an API key](https://platform.parallel.ai/)

## What you can do

* Enrich warehouse records with fresh web information from SQL.
* Keep web-research workflows close to data already stored in Snowflake.

## How it works

Parallel ships a SQL-native user defined table function, parallel\_enrich(), that calls the Task API from inside Snowflake queries.

It uses Snowflake External Access with the API key stored as a Snowflake Secret, and batches all rows in a partition into a single API call for efficient enrichment.

## Set up in three steps

1. 1\. Review the data-integration architecture and prerequisites.
2. 2\. Configure the SQL UDTF and required Parallel credentials.
3. 3\. Run a sample query, inspect the returned fields, and adapt it to the target table.

[View Snowflake setup](https://docs.parallel.ai/data-integrations/overview)

Category

[Data Platforms](https://parallel.ai/integrations?category=data-platforms)

Available as

Data function

Product surface

Snowflake SQL UDTF

Quick links

* [Setup and documentation](https://docs.parallel.ai/data-integrations/overview)
* [Get a Parallel API key](https://platform.parallel.ai)

Last verified: 4 August 2026

## Related integrations

### [Supabase](https://parallel.ai/integrations/supabase)

Call Parallel from a Supabase Edge Function to add live web data to server-side application workflows.

Data Platforms

### [AWS Marketplace](https://parallel.ai/integrations/aws-marketplace)

Procure and manage Parallel through AWS Marketplace using your existing cloud purchasing workflow.

Cloud Marketplaces

### [Google Cloud Marketplace](https://parallel.ai/integrations/google-cloud-marketplace)

Procure and manage Parallel through Google Cloud Marketplace using your existing cloud purchasing workflow.

Cloud Marketplaces
