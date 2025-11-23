# Choose a Processor

> Parallel FindAll pricing structure and processors

FindAll pricing reflects the comprehensive research performed and is based on the processor chosen:

| Component      | `base`  | `pro`   | Unit                                                                                                        |
| -------------- | ------- | ------- | ----------------------------------------------------------------------------------------------------------- |
| **Generator**  | \$1.00  | \$5.00  | Per query                                                                                                   |
| **Constraint** | \$0.030 | \$0.200 | Per candidate evaluated, independent of number of constraints                                               |
| **Enrichment** | \$0.010 | \$0.100 | Per enrichment, depends on number of enrichments. Run only on candidates fully matching all the constraints |

### Example Calculations

**Simple Example** - Constraint-only query with 100 candidates using base processor:

* Generator: \$1.00
* Constraint: 100 entities × \$0.03 = \$3.00
* **Total Cost: \$4.00**

**Complex Example** - Query with 100 candidates, constraints + enrichments using base processor:

* Generator: \$1.00
* Constraint: 100 entities × \$0.03 = \$3.00
* Enrichment: 50 matches × 3 fields × \$0.01 = \$1.50
* **Total Cost: \$5.50**

<Note>
  **Cancelled Runs**: If you cancel a FindAll run, you will still be charged for any processing completed before the cancellation, including the generator cost and any constraint/enrichment evaluations that finished.
</Note>
