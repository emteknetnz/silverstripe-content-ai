/* eslint-disable */
import Injector from 'lib/Injector';
import ChatGPTField from 'components/ChatGPTField/ChatGPTField';

const registerComponents = () => {
  Injector.component.registerMany({
    ChatGPTField,
  });
};

export default registerComponents;
