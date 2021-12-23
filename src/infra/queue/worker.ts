import { config } from "dotenv-flow";

config({ silent: true });

import { BullProvider } from "@infra/providers/implementations/queue/BullProvider";
import { DeliverMessageToRecipient } from "@modules/broadcasting/useCases/DeliverMessageToRecipient/DeliverMessageToRecipient";
import { SESProvider } from "@infra/providers/implementations/mail/AmazonSESProvider";

const mailSESProvider = new SESProvider();

const mailQueueProvider = new BullProvider();

const deliverMessageToRecipient = new DeliverMessageToRecipient(
  mailSESProvider
);

mailQueueProvider.process(async ({ data }) => {
  await deliverMessageToRecipient.execute(data);
});
