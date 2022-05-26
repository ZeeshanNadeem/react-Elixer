


import React, { Component } from 'react'
import plan from "./plan.json";
import ExtractData from "./ExtractData.json";
import { Col, Row } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';




const MyTable = () => {
  let planRead = [];
  let ExtractRead = [];


  for (const [key, Value] of Object.entries(plan)) {
    let obj = { key_: key, value: Value };
    planRead.push(obj);


  }
  for (const [key, Value] of Object.entries(ExtractData)) {
    let obj = { key_: key, value: Value };
    ExtractRead.push(obj);


  }

  const [rightTree, setRightTree] = React.useState([
    { value: ExtractData.PlanID, label: ExtractRead[0].key_, index: 0, draggerID: "PlanID" },
    { value: ExtractData.PlanName, label: ExtractRead[1].key_, index: 1, draggerID: "PlanName" },
    { value: ExtractData.PlanType, label: ExtractRead[2].key_, index: 2, draggerID: "PlanType" },
    { value: ExtractData.PlanYear, label: ExtractRead[3].key_, index: 3, draggerID: "PlanYear" },
    { value: ExtractData.ContractNumber, label: ExtractRead[4].key_, index: 4, draggerID: "ContractNumber" },
  ]);

  const [rightTree_, setRightTree_] = React.useState([
    { value: ExtractData.PlanID, label: ExtractRead[0].key_, index: 0, draggerID: "PlanID" },
    { value: ExtractData.PlanName, label: ExtractRead[1].key_, index: 1, draggerID: "PlanName" },
    { value: ExtractData.PlanType, label: ExtractRead[2].key_, index: 2, draggerID: "PlanType" },
    { value: ExtractData.PlanYear, label: ExtractRead[3].key_, index: 3, draggerID: "PlanYear" },
    { value: ExtractData.ContractNumber, label: ExtractRead[4].key_, index: 4, draggerID: "ContractNumber" },
  ]);

  const [leftTree, setLeftTree] = React.useState([
    { value: plan.Plan1, label: planRead[0].key_, id: "322312323", draggerID: "Plan1" },
    { value: plan.PlanName1, label: planRead[1].key_, id: "3223ere23", draggerID: "PlanName1" },
    { value: plan.PlanType1, label: planRead[2].key_, id: "322eqwe23", draggerID: "PlanType1" },
  ]);


  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(rightTree);
    const find = leftTree.filter(x => x.label === result.draggableId);
    const newLeftTree = leftTree.filter(x => x.label !== result.draggableId);
    console.log("destination:", result.destination.index)
    let temp = {};
    if (result.destination.index !== rightTree_.length - 1 && find[0] != undefined) {
      temp = { id: find[0].id, value: find[0].value, label: find[0].label, draggerID: find[0].draggerID }

      temp.label = `${find[0].label} mapped to ${rightTree_[result.destination.index].label}`
      rightTree_.splice(result.destination.index, 0, temp);
    }
    items.splice(result.destination.index, 0, find[0]);
    setLeftTree(newLeftTree);
    setRightTree(items);
    if (Object.keys(temp).length > 0) {

      setRightTree_(rightTree_)

    }
    else
      setRightTree_(items)
  }



  return (
    <React.Fragment>

      <Row>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <>
                <Col md={5}>


                  <h2>XML/JSON 1</h2>

                  <small
                  >Plan</small>

                  <ul className="list-style" {...provided.droppableProps} ref={provided.innerRef} >
                    {leftTree.length > 0 && leftTree.map((data, index) => {


                      return <Draggable key={index} draggableId={data.draggerID}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            key={index}
                            ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}

                          >

                            {data.label}:"{data.value}"

                          </li>
                        )}
                      </Draggable>



                    })}

                    {provided.placeholder}
                  </ul>

                </Col>
              </>
            )}
          </Droppable>




          <Col md={7}>
            <h2>XML/JSON 2</h2>
            <small>ExtractData</small>
            <Droppable droppableId="characters2">
              {(provided) => (
                <ul className="list-style" {...provided.droppableProps} ref={provided.innerRef} >
                  {rightTree.length > 0 && rightTree.map((data, index) => {
                    if (data != undefined) {
                      return <Draggable key={index} draggableId={data.draggerID} index={index}

                      >
                        {(provided) => (
                          <li
                            key={index}

                            ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                          >

                            {data.label}:"{data.value}"

                          </li>
                        )}
                      </Draggable>
                    }

                  })}

                  {provided.placeholder}
                </ul>
              )}
            </Droppable>


          </Col>

        </DragDropContext>
      </Row>
      <table className="table mt-5">

        <thead className="head">

          <tr>

            <th scope="col">XML/JSON 1</th>
            <th scope="col">XML/JSON 2</th>

          </tr>
        </thead>
        <tbody>

          {(leftTree.length >= rightTree_.length ? leftTree : rightTree_).map((_, index) => (

            <tr>
              <td>{leftTree[index] != undefined && leftTree[index].label}</td>
              <td>{rightTree_[index] != undefined && rightTree_[index].label}</td>
            </tr>
          ))}




        </tbody>
      </table>
    </React.Fragment>
  )
}

export default MyTable;

