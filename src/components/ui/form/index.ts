import { InputWrapper } from './components/input-wrapper';
import { withController } from './hoc/withController';
import { withWatcher } from './hoc/withWatcher';

export * from './form';

export const InputText = withWatcher(
  withController(InputWrapper, ({ field }) => ({
    type: 'text',
    name: field.name,
    value: field.value as never,
  }))
);

export const InputNumber = withWatcher(
  withController(InputWrapper, ({ field }) => ({
    type: 'number',
    name: field.name,
    value: field.value as never,
  }))
);
