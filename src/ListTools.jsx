import React, { useState } from "react";
import { useDrag } from "react-dnd";

import { Data, Action } from "./data";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";

import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { Grid } from "@material-ui/core";
const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const TOOL = "tool";

const Tool = ({ name, img }) => {
  const [, drag] = useDrag({
    item: {
      type: TOOL,
      name,
      img,
    },
  });
  return (
    <div className="tool" ref={drag}>
      {name}
    </div>
  );
};

const ListTools = () => {
  const [expanded, setExpanded] = useState("panel1");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <Grid spacing={1}>
      {Data.map((item) => (
        <Accordion
          square
          expanded={expanded === item.id}
          onChange={handleChange(item.id)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <Typography>{item.name}</Typography>
          </AccordionSummary>
          {Action.filter(
            (data) => data.actionId === item.actionId
          ).map((data) =>
            data.Action.map((actions, index) => (
              <Tool name={actions} img={data.logoImg} />
            ))
          )}
        </Accordion>
      ))}
    </Grid>
  );
};

export default ListTools;


