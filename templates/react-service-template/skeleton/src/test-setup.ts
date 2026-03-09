{%- if values.testingFramework == 'vitest' %}
import '@testing-library/jest-dom/vitest'
{%- endif %}
{%- if values.testingFramework == 'jest' %}
import '@testing-library/jest-dom'
{%- endif %}