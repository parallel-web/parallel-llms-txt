> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# AWS Marketplace

> Access Parallel's API through the AWS Marketplace

Parallel's APIs are available through the [Amazon Web Services (AWS) Marketplace](https://aws.amazon.com/marketplace/pp/prodview-zpw7j3ozjqlb4).
You can use your AWS account to access all of Parallel's features.
Signing up through AWS allows you to provision resources based on your requirements and pay through your existing AWS billing.

## How to Sign Up Through AWS Marketplace

1. Navigate to [AWS Marketplace](https://us-east-1.console.aws.amazon.com/marketplace/search) and search for
   Parallel Web Systems, or go directly to our [product listing](https://aws.amazon.com/marketplace/pp/prodview-zpw7j3ozjqlb4).
2. Click on the product listing, then select `View purchase`.
3. Subscribe to our listing. You can review pricing for different processors
   [here](/task-api/guides/choose-a-processor).
4. Click `Set up your account`. You will need to create a new organization linked to your AWS account,
   even if you're already part of other organizations. See our
   [FAQ](#frequently-asked-questions) for more details.
5. After creating your new organization, you can use our products as usual through our API or
   platform interface.

Your usage charges will appear in the AWS Billing & Cloud Management dashboard with your other AWS services.

## Frequently Asked Questions

<Accordion title="Are there advantages to subscribing through AWS Marketplace?">
  Yes, AWS Marketplace subscriptions provide billing and procurement benefits,
  particularly for organizations with centralized cloud spending or AWS credits.

  These are primarily financial and operational conveniences—Parallel's features, support, and performance remain identical.
</Accordion>

<Accordion title="Can I link my existing Parallel account to AWS Marketplace?">
  No, accounts created directly through our platform cannot be connected to AWS Marketplace retroactively.
</Accordion>

<Accordion title="Can I migrate to AWS Marketplace billing later?">
  To use AWS Marketplace billing in the future, you would need to create a new
  Parallel account through the Marketplace.
</Accordion>

<Accordion title="Do I get the same features regardless of how I sign up?">
  Yes. Parallel delivers identical platform capabilities to all customers—whether you sign up directly or through AWS Marketplace.
  The difference is in billing and commercial arrangements, not technical functionality.
</Accordion>

<Accordion title="I'm getting an error when trying to create an AWS Marketplace account. What should I do?">
  AWS account creation typically fails for two reasons:

  i. Your AWS account is already linked to a Parallel account.

  ii. Your signup token expired due to a delay between subscribing on AWS Marketplace and completing account setup.

  You'll see a specific error message indicating which issue you're experiencing.

  For expired tokens, try canceling and recreating your subscription. If problems persist,
  [contact support](mailto:support@parallel.ai). For existing account conflicts, check with your organization about
  joining their existing Parallel account.
</Accordion>

<Accordion title="When will usage from my Parallel account reflect in my AWS invoice?">
  For AWS, usages are aggregated hourly and sent to AWS for metering. For a more granular usage report, you
  can use the Usage tab in the settings page in our platform.
</Accordion>
