import { generateText } from 'ai'
// import { createOpenAI } from '@ai-sdk/openai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'

import { inngest } from './client'

// const openai = createOpenAI()
const google = createGoogleGenerativeAI()

export const execute = inngest.createFunction(
  { id: 'execute-ai' },
  { event: 'execute/ai' },
  async ({ event, step }) => {
    const { steps } = await step.ai.wrap(
      'gemini-generate-text',
      generateText,
      {
        model: google('gemini-2.5-flash'),
        system: 'You are a helpful assitant.',
        prompt: 'What is 2 + 2?',
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        }
      }
    )

    // const { steps } = await step.ai.wrap(
    //   'openai-generate-text',
    //   generateText,
    //   {
    //     model: openai('gpt-4'),
    //     system: 'You are a helpful assitant.',
    //     prompt: 'What is 2 + 2?'
    //   }
    // )

    return steps
  }
)