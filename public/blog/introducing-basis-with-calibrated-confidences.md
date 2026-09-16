# Introducing Basis with Calibrated Confidences 

A new standard for verifiable AI web research


A month ago, we launched the Parallel Task API, powered by a series of processors that offer state of the art accuracy on web research tasks at every single price point.

We recognize, however, that production use case don't just require pareto-optimal performance — they also require verifiability and calibrated confidence scoring and so today, we're excited to announce Basis — an essential suite of verification tools for the Parallel Task API.

Basis is an automatically included add-on to our Core, Pro, and Ultra processors that provide additional context and evidence around how we came to our conclusion, as well as how confident we are in our findings.

They allow you to identify instances where AI web research may yield unreliable results, enabling targeted human-in-the-loop workflows that efficiently focus human attention only where it's most needed. This strategic approach drastically reduces manual review hours while achieving significantly higher accuracy in hybrid human/AI workflows compared to either AI-only or human-only alternatives.

![Confidence example as a competitor analysis task in Platform UI](https://cdn.sanity.io/images/5hzduz3y/production/0a5bf3b45a7c6fd1d26232847f72f6b182ae50b8-1280x852.png)

### **
What is Basis?**



Basis provides a complete framework for understanding and validating Task API outputs through four core components:



- **Citations**: Web URLs linking directly to source materials.
- **Reasoning**: Detailed explanations justifying each output field.
- **Excerpts**: Relevant text snippets from citation URLs.
- **Confidences**: A calibrated measure of confidence classified into low, medium, or high categories.



These elements work together to create a robust framework for output verification that sets a new industry standard for transparency and reliability. For more information on Basis outputs in our Task API, go to [docs](https://docs.parallel.ai/task-api/guides/access-research-basis).

```json
{
  "field": "crm_system",
  "citations": [
    {
      "url": "https://www.linkedin.com/jobs/view/sales-representative-microsoft-dynamics-365-at-contoso-inc-3584271",
      "excerpts": ["Looking for sales professionals with experience in Microsoft Dynamics 365 CRM to join our growing team."]
    }
  ],
  "reasoning": "There is limited direct evidence about which CRM system the company uses internally. The job posting suggests they work with Microsoft Dynamics 365, but it's not explicitly stated whether this is their primary internal CRM or simply a product they sell/support. No official company documentation confirming their internal CRM system was found.",
  "confidence": "low"
}
```

### Calibrated Confidences



Confidence ratings aren't particularly useful without calibration — you need to know that high, medium, and low labels provide useful and differentiable insight into task performance.

To calibrate confidence ratings, we’ve tested confidence patterns on composite datasets that reflect a wide array of real world use cases. Each composite dataset has varying levels of difficulty to demonstrate confidence performance and distribution across any web research task. 

Why is this important?

## **Confidence provides insight into the difficulty of a Task**



When Parallel returns a higher percentage of Basis outputs as "High" Confidence, you can reliably interpret this as Parallel's Task API performing well on the Task. 

You can use confidences as a proxy for a full evaluation, and understand how well your Tasks perform relative to each other.

### Confidences % High vs Accuracy 

[object Object],[object Object],[object Object],[object Object],[object Object]

```
[
  {
    "label": "Easy",
    "x": 78,
    "y": 91
  }
]
```

```
[
  {
    "label": "Medium",
    "x": 72,
    "y": 80
  }
]
```

```
[
  {
    "label": "Hard",
    "x": 53,
    "y": 70
  }
]
```

## **Low confidence ratings provide efficient identification of what to review **

By reviewing just the outputs rated as "Low" Confidence—a small portion of your total dataset—you can typically achieve an ~2x reduction in error rate, giving you significantly more leverage over human time compared to reviewing all outputs. 



### Paired Chart

| Group | A | B |
| --- | --- | --- |
| Easy | Before: 9.28 | After: 5.35 |
| Medium | Before: 17.6 | After: 12.7 |
| Hard | Before: 30 | After: 10.8 |

## **High confidence ratings can be reliably skipped in manual review workflows**

Outputs marked as "High" Confidence have 2-3X lower error rates than that of the overall dataset.



### High Conf Paired Chart

| Group | A | B |
| --- | --- | --- |
| Easy | Overall: 9.28 | High: 2.76 |
| Medium | Overall: 17.6 | High: 9.1912 |
| Hard | Overall: 30 | High: 14.1 |

### **Built for real-world applications at scale**



Basis is particularly valuable for hybrid AI-human workflows where the addition of AI significantly increases leverage, accuracy, and time efficiency. By focusing human review on outputs with low confidence, teams can dramatically reduce verification time while maintaining quality standards. This approach allows enterprises to scale their web research operations without sacrificing accuracy or transparency.

Today, Basis powers human-in-the-loop production workflows across numerous domains. Insurance underwriters leverage low-confidence indicators and citation trails to streamline KYB verification processes that were previously manual. AI automation platforms use Basis to validate data enrichment capabilities before pushing to production, providing traceability from enriched fields back to source materials.

The Basis framework with calibrated confidences is available today with the Parallel Task API. To start building with verifiable web research, go to the [Parallel Developer Platform](https://platform.parallel.ai/).

---

## **Notes on Methodology**

**Testing Dates**: Testing was conducted between May 12 and May 15, 2025

**Benchmark Details**: The Parallel Confidence datasets cover easy, medium, and hard web research questions that all reflect a wide range of representative real world use cases. Three example questions are below.

**Example Questions**:



- **Compliance**
Return if SOC2, ISO27001, PCI DSS are compliance frameworks mentioned on imsedge.com. If yes, return only the name of the compliance framework or frameworks that are mentioned. Otherwise, return no.
- **Company research**
Return if a company is B2B or B2C, the CEO’s Linkedin URL, the CEO’s name, the CEO’s undergrad institution, and the employee count of the company as of January 2025.
- **Financial research**
Find the SEC 10-K filing of the company as of January 2025 and the list of stock exchanges the company is listed on as of January 2025.



**Additional Data: **



### Confidence Distribution per Accuracy Level 

```
[
  {
    "label": "High",
    "Correct": {
      "value": 97.2,
      "color": "#81C784"
    },
    "Incorrect": {
      "value": 2.8,
      "color": "#E57373"
    }
  },
  {
    "label": "Medium",
    "Correct": {
      "value": 71.9,
      "color": "#81C784"
    },
    "Incorrect": {
      "value": 28.1,
      "color": "#E57373"
    }
  },
  {
    "label": "Low",
    "Correct": {
      "value": 64.5,
      "color": "#81C784"
    },
    "Incorrect": {
      "value": 35.5,
      "color": "#E57373"
    }
  },
  {
    "label": " ",
    "Correct": {
      "value": 0
    }
  },
  {
    "label": "High ",
    "Correct": {
      "value": 97.5,
      "color": "#81C784"
    },
    "Incorrect": {
      "value": 2.5,
      "color": "#E57373"
    }
  },
  {
    "label": "Medium ",
    "Correct": {
      "value": 82.6,
      "color": "#81C784"
    },
    "Incorrect": {
      "value": 17.4,
      "color": "#E57373"
    }
  },
  {
    "label": "Low ",
    "Correct": {
      "value": 37.5,
      "color": "#81C784"
    },
    "Incorrect": {
      "value": 62.5,
      "color": "#E57373"
    }
  },
  {
    "label": "  ",
    "Correct": {
      "value": 0
    }
  },
  {
    "label": "High  ",
    "Correct": {
      "value": 85.9,
      "color": "#81C784"
    },
    "Incorrect": {
      "value": 14.1,
      "color": "#E57373"
    }
  },
  {
    "label": "Medium  ",
    "Correct": {
      "value": 80.0,
      "color": "#81C784"
    },
    "Incorrect": {
      "value": 20.0,
      "color": "#E57373"
    }
  },
  {
    "label": "Low  ",
    "Correct": {
      "value": 36.1,
      "color": "#81C784"
    },
    "Incorrect": {
      "value": 63.9,
      "color": "#E57373"
    }
  }
]
```

### Raw Question Count per Confidence Level 

```
[
  {
    "label": "High",
    "Correct": {
      "value": 211,
      "color": "#81C784"
    },
    "Incorrect": {
      "value": 6,
      "color": "#E57373"
    }
  },
  {
    "label": "Medium",
    "Correct": {
      "value": 23,
      "color": "#81C784"
    },
    "Incorrect": {
      "value": 9,
      "color": "#E57373"
    }
  },
  {
    "label": "Low",
    "Correct": {
      "value": 20,
      "color": "#81C784"
    },
    "Incorrect": {
      "value": 11,
      "color": "#E57373"
    }
  },
  {
    "label": " ",
    "Correct": {
      "value": 0
    }
  },
  {
    "label": "High ",
    "Correct": {
      "value": 116,
      "color": "#81C784"
    },
    "Incorrect": {
      "value": 3,
      "color": "#E57373"
    }
  },
  {
    "label": "Medium ",
    "Correct": {
      "value": 19,
      "color": "#81C784"
    },
    "Incorrect": {
      "value": 4,
      "color": "#E57373"
    }
  },
  {
    "label": "Low ",
    "Correct": {
      "value": 6,
      "color": "#81C784"
    },
    "Incorrect": {
      "value": 10,
      "color": "#E57373"
    }
  },
  {
    "label": "  ",
    "Correct": {
      "value": 0
    }
  },
  {
    "label": "High  ",
    "Correct": {
      "value": 55,
      "color": "#81C784"
    },
    "Incorrect": {
      "value": 9,
      "color": "#E57373"
    }
  },
  {
    "label": "Medium  ",
    "Correct": {
      "value": 16,
      "color": "#81C784"
    },
    "Incorrect": {
      "value": 4,
      "color": "#E57373"
    }
  },
  {
    "label": "Low  ",
    "Correct": {
      "value": 13,
      "color": "#81C784"
    },
    "Incorrect": {
      "value": 23,
      "color": "#E57373"
    }
  }
]
```
