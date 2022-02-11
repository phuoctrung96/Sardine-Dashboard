import React, { useState } from "react";
import { makeStyles, Step, StepConnector, StepLabel, Stepper, Tooltip } from "@material-ui/core";
// eslint-disable-next-line import/no-extraneous-dependencies
import { withStyles } from "@material-ui/styles";
import clsx from "clsx";
import { Card, Col, Container, Row, Tooltip as TooltipBT, OverlayTrigger } from "react-bootstrap";
import { BehaviorBiometricsPerFlow, BiometricField, AnyTodo } from "sardine-dashboard-typescript-definitions";
import { StyledCard, StyledCardBody } from "../Customers/styles";

export interface BehaviorBiometricsProps {
  behavior_biometrics: Array<BehaviorBiometricsPerFlow>;
}

// Stepper customizations
const QontoConnector = withStyles({
  line: {
    borderColor: "#784af4",
    borderTopWidth: 2,
    borderRadius: 1,
  },
})(StepConnector);

const BehaviorBiometrics = (props: BehaviorBiometricsProps) => {
  const behaviorBiometrics = props.behavior_biometrics
    .sort((bb) => bb.created_at)
    .map((bb) => Object.assign(bb, { flow: bb.flow || "-" }));
  const stepToFlow = behaviorBiometrics.reduce((acc: { [key: string]: number }, bb, idx: number) => {
    acc[bb.flow] = idx;
    return acc;
  }, {});
  const [inFocusFlow, setInFocusFlow] = useState(behaviorBiometrics.length > 0 ? behaviorBiometrics[0]?.flow : "");

  const renderStepper = () => {
    if (behaviorBiometrics.length > 1) {
      return (
        <Row style={{ marginBottom: 15 }} id="biometrics_steps">
          <Stepper alternativeLabel orientation="vertical" activeStep={stepToFlow[inFocusFlow]} connector={<QontoConnector />}>
            {behaviorBiometrics.map((bb) => (
              <Step id={bb.flow} key={bb.flow} onClick={() => setInFocusFlow(bb.flow)}>
                <Tooltip title={bb.flow} placement="top">
                  <StepLabel StepIconComponent={QontoStepIcon}>{bb.flow}</StepLabel>
                </Tooltip>
              </Step>
            ))}
          </Stepper>
        </Row>
      );
    }
  };

  const renderNoBiometricsDetailsFound = () => {
    if (behaviorBiometrics.length === 0) {
      return (
        <div className="text-center" id="no_biometrics_message">
          <h4>No Behavior Biometrics details found.</h4>
        </div>
      );
    }
  };

  return (
    <StyledCard style={{ marginTop: 15 }}>
      <Card.Header id="biometrics_title" style={{ color: "var(--dark-14)" }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M26.9994 19.0011C26.998 17.9405 26.5762 16.9238 25.8264 16.1738C25.0766 15.4237 24.0599 15.0017 22.9994 15.0001H8.99936C8.46917 14.9993 7.96092 14.7883 7.58602 14.4134C7.21112 14.0385 7.00015 13.5303 6.99936 13.0001V9.85707C7.68672 9.67794 8.31388 9.31877 8.81624 8.81659C9.3186 8.31441 9.67798 7.68737 9.85736 7.00007H22.1414C22.3848 7.94273 22.9636 8.76426 23.7694 9.31068C24.5751 9.85709 25.5525 10.0909 26.5184 9.96819C27.4842 9.84552 28.3721 9.37481 29.0157 8.64431C29.6593 7.9138 30.0143 6.97365 30.0143 6.00007C30.0143 5.0265 29.6593 4.08635 29.0157 3.35584C28.3721 2.62534 27.4842 2.15463 26.5184 2.03196C25.5525 1.90928 24.5751 2.14306 23.7694 2.68947C22.9636 3.23589 22.3848 4.05742 22.1414 5.00007H9.85736C9.68249 4.31768 9.33016 3.69371 8.83615 3.19152C8.34214 2.68933 7.72403 2.3268 7.04459 2.14076C6.36516 1.95471 5.64859 1.95177 4.96765 2.13224C4.28672 2.3127 3.66566 2.67013 3.16754 3.16825C2.66942 3.66637 2.31198 4.28743 2.13152 4.96837C1.95106 5.64931 1.954 6.36588 2.14004 7.04531C2.32609 7.72475 2.68861 8.34285 3.1908 8.83687C3.69299 9.33088 4.31696 9.68321 4.99936 9.85807V12.9991C5.00068 14.0598 5.42264 15.0767 6.17269 15.8267C6.92273 16.5768 7.93963 16.9988 9.00036 17.0001H22.9994C23.5297 17.0009 24.0381 17.212 24.413 17.5871C24.788 17.9622 24.9988 18.4707 24.9994 19.0011V22.0001H21.9994V25.0001H9.85736C9.61396 24.0574 9.03513 23.2359 8.22935 22.6895C7.42357 22.1431 6.44617 21.9093 5.48036 22.032C4.51454 22.1546 3.62662 22.6253 2.98304 23.3558C2.33945 24.0863 1.98438 25.0265 1.98438 26.0001C1.98438 26.9736 2.33945 27.9138 2.98304 28.6443C3.62662 29.3748 4.51454 29.8455 5.48036 29.9682C6.44617 30.0909 7.42357 29.8571 8.22935 29.3107C9.03513 28.7643 9.61396 27.9427 9.85736 27.0001H21.9994V30.0001H29.9994V22.0001H26.9994V19.0011ZM25.9994 4.00007C26.3949 4.00007 26.7816 4.11737 27.1105 4.33714C27.4394 4.5569 27.6957 4.86926 27.8471 5.23471C27.9985 5.60016 28.0381 6.00229 27.9609 6.39025C27.8838 6.77822 27.6933 7.13458 27.4136 7.41429C27.1339 7.69399 26.7775 7.88447 26.3895 7.96165C26.0016 8.03882 25.5994 7.99921 25.234 7.84783C24.8685 7.69646 24.5562 7.44011 24.3364 7.11121C24.1167 6.78232 23.9994 6.39564 23.9994 6.00007C23.9999 5.4698 24.2108 4.9614 24.5857 4.58645C24.9607 4.21149 25.4691 4.0006 25.9994 4.00007V4.00007ZM3.99936 6.00007C3.99936 5.60451 4.11666 5.21783 4.33642 4.88893C4.55618 4.56004 4.86854 4.30369 5.23399 4.15232C5.59944 4.00094 6.00158 3.96133 6.38954 4.0385C6.7775 4.11567 7.13387 4.30616 7.41357 4.58586C7.69328 4.86557 7.88376 5.22193 7.96093 5.60989C8.0381 5.99786 7.99849 6.39999 7.84712 6.76544C7.69574 7.13089 7.4394 7.44325 7.1105 7.66301C6.7816 7.88278 6.39492 8.00007 5.99936 8.00007C5.46909 7.99954 4.96069 7.78866 4.58573 7.4137C4.21077 7.03874 3.99989 6.53034 3.99936 6.00007V6.00007ZM5.99936 28.0001C5.6038 28.0001 5.21712 27.8828 4.88822 27.663C4.55932 27.4433 4.30297 27.1309 4.1516 26.7654C4.00022 26.4 3.96062 25.9979 4.03779 25.6099C4.11496 25.2219 4.30544 24.8656 4.58514 24.5859C4.86485 24.3062 5.22122 24.1157 5.60918 24.0385C5.99714 23.9613 6.39927 24.0009 6.76473 24.1523C7.13018 24.3037 7.44253 24.56 7.6623 24.8889C7.88206 25.2178 7.99936 25.6045 7.99936 26.0001C7.99883 26.5303 7.78794 27.0387 7.41299 27.4137C7.03803 27.7887 6.52963 27.9995 5.99936 28.0001V28.0001ZM27.9994 24.0001V28.0001H23.9994V24.0001H27.9994Z" fill="#141A39"/>
        </svg>
        <span>Behavior Biometrics</span>
      </Card.Header>
      <StyledCardBody>
        {renderNoBiometricsDetailsFound()}
        {renderStepper()}
        {behaviorBiometrics
          .filter((bb) => bb.flow === inFocusFlow)
          .map((bb) => (
            <BehaviorBiometric {...bb} key={bb.created_at} />
          ))}
      </StyledCardBody>
    </StyledCard>
  );
};

const renderFields = (fields: Array<BiometricField>) => {
  if (fields.length > 0) {
    return (
      <>
        {fields.map((f) => (
          <span key={f.name}>
            <BiometricFieldComponent {...f} />
            <hr />
          </span>
        ))}
      </>
    );
  }
  return (
    <Row>
      <Col className="text-center">No Input Fields Found</Col>
    </Row>
  );
};

const Attribute: React.FC<{ property: string; value: AnyTodo; description?: string }> = (props) => {
  const { property, value, description } = props;

  if (property !== "Flow") {
    return (
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <div>
          <OverlayTrigger placement="top" overlay={<TooltipBT id={`tooltip-${property}`}> {description || ""} </TooltipBT>}>
            <p
              style={{
                fontSize: 14,
                textTransform: "capitalize",
                fontWeight: "normal",
                margin: 0

              }}
              id={`${property}_title`}
            >
              {property}:
            </p>
          </OverlayTrigger>
        </div>
        <div id={`${property}_value`}>
          {String(value)}{" "}
        </div>
      </div>
    );    
  } else {
    return (
      <Row>
        <p style={{ fontSize:20, fontWeight: "semibold" }} >{String(value)}{" "}</p>
      </Row>
    );
  }
};

const BehaviorBiometric: React.FC<BehaviorBiometricsPerFlow> = (props) => {
  const { fields, flow, num_context_switch_events, num_distraction_events } = props;
  return (
    <Container>
      <Row>
        <Col xs={12} lg={6} style={{ padding: "0 20px" }}>
          <Attribute property="Flow" value={flow} description="Flow provided by you" />
          <Attribute
            property="Num Distraction Events"
            value={num_distraction_events}
            description="No of times user switched between tabs/windows"
          />
          <Attribute
            property="Num Context Switch Events"
            value={num_context_switch_events}
            description="No of context switches"
          />
        </Col>
        <Col xs={12} lg={6} style={{ padding: "0 20px", }}>
          <Row className="text-center">
            <p id="input_field_title" style={{ fontSize: 20, fontWeight: "semibold"}}>Input Fields</p>
          </Row>
          {renderFields(fields)}
        </Col>
      </Row>
    </Container>
  );
};

const BiometricFieldComponent: React.FC<BiometricField> = (props) => {
  const {
    hesitation_percentage,
    is_ltm,
    name,
    num_auto_fill_events,
    num_clipboard_events,
    num_copy_paste_events,
    num_expert_key_events,
  } = props;
  return (
    <>
      <Attribute property="Name" value={name} description="Input field name" />
      <Attribute property="Num Copy Paste Events" value={num_copy_paste_events} description="Copy paste by keyboard shortcuts" />
      <Attribute property="Num Clipboard Events" value={num_clipboard_events} description="Copy paste by mouse" />
      <Attribute property="Num Auto Fill Events" value={num_auto_fill_events} description="Num of autofill events" />
      <Attribute
        property="Num Expert Key Events"
        value={num_expert_key_events}
        description="If special keys are used while filling this field"
      />
      <Attribute
        property="Hesitation Percentage"
        value={hesitation_percentage}
        description="Calculated based on backspaces and timespent while filling this field"
      />
      <Attribute property="Is Ltm" value={is_ltm} description="PII field" />
    </>
  );
};

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
  },
  active: {
    color: "#784af4",
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  completed: {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
});

const QontoStepIcon = (props: { active: AnyTodo; completed: AnyTodo }) => {
  const classes = useQontoStepIconStyles();
  const { active } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      <div className={classes.circle} />
    </div>
  );
};

export default BehaviorBiometrics;
