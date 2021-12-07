import React from 'react';
import { useRealm } from 'use-realm';
import { Container } from '../components/Container';
import { DarkModeSwitch } from '../components/DarkModeSwitch';
import { STEP } from '../components/realm';

/* Import Page Components here */
import DefaultAccess from '../components/routes/Access';
import CreatePin from '../components/routes/CreatePin';
import Authenticate from '../components/routes/EnterPin';
import Dip from '../components/routes/Dip';

interface IViewProps {
  useFormStep: (...args: any) => React.Dispatch<React.SetStateAction<string>> | Promise<void>;
}

export default function View(props: IViewProps): JSX.Element {
  const [__step__] = useRealm<string>(STEP);

  // console.warn(store, __step__);
  // const handleWizard = async (data: any): Promise<void> => {
  //   await setStore(Object.assign(store, data));
  //   useStep(data?.__step__);
  // };

  let FormComponent: React.FC<IViewProps> = () => <div>Root</div>;

  switch (__step__) {
    case 'default':
      FormComponent = DefaultAccess;
      break;
    case 'createPin':
      FormComponent = CreatePin;
      break;
    case 'authenticate':
      FormComponent = Authenticate;
      break;
    case 'dip':
      FormComponent = Dip;
      break;
    // case 'activity':
    //     FormComponent = Activity;
    //     break;
    default:
      break;
  }

  return (
    <Container minW={'6xl'} minH='100vh'>
      {/* === emebed form fields here === */}
      <FormComponent {...props} />
      <DarkModeSwitch />
    </Container>
  );
}
