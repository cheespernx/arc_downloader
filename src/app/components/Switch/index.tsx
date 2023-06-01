import React, { useState } from "react";
import Switch from "react-switch";
import './styles.scss';

type TypeSwitchProps = {
  hidden: boolean,
}

const TypeSwitch = (props: TypeSwitchProps) => {
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = (nextChecked: boolean | ((prevState: boolean) => boolean)) => {
    setChecked(nextChecked);
  };
  return (
    <div className={props.hidden ? 'hidden switch-container' : 'switch-container'}>
      <span>Download vídeo?</span>
      <Switch 
        onChange={handleChange}
        checked={checked}
      />
    </div>
  );
}

export default TypeSwitch;