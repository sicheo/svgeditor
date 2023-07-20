import { v4 as uuidv4 } from 'uuid';

export function addElement(elem: any, array: any, divname: any, node: any, optype: any, modalTag: any = 'modal-editor-div-id') {

    if (elem.uid == null)
        elem.uid = uuidv4()
    if (elem.name == '')
        elem.name = array[0].name

    const opcontdiv = document.getElementById(divname)
    const subdivname = divname + "-row"
    const tooldivname = divname + "-tool-row"

    if (!opcontdiv)
        return
    opcontdiv.style.cssText += 'display:block;';
    // OPEARATION DIV
    const opdiv = document.createElement("div");
    opdiv.classList.add(subdivname);
    opdiv.style.cssText += 'margin-top:4px;';
    // OPERATION DIV TOOLDIV
    const tooldiv = document.createElement("div");
    tooldiv.classList.add(tooldivname);
    tooldiv.style.cssText += 'margin-top:4px;display:block';

    // EDIT  IMAGE INPUT
    var editElement = document.createElement("input");
    editElement.type = 'image';
    editElement.setAttribute('src', '../edit.svg');
    editElement.setAttribute('alt', 'EDIT');
    editElement.setAttribute('width', '20');
    editElement.setAttribute('height', '20');
    editElement.id = "EDIT_" + elem.uid
    editElement.addEventListener('click', (e: any) => { onEdit(e, optype, modalTag) })
    tooldiv.appendChild(editElement);
    opdiv.appendChild(tooldiv);

    // DELETE  IMAGE INPUT
    var delElement = document.createElement("input");
    delElement.type = 'image';
    delElement.setAttribute('src', '../DELETE.svg');
    delElement.setAttribute('alt', 'DELETE');
    delElement.setAttribute('width', '20');
    delElement.setAttribute('height', '20');
    delElement.id = "DELETE_" + elem.uid
    delElement.addEventListener('click', (e: any) => { onDelete(e, node, optype) })
    tooldiv.appendChild(delElement);
    opdiv.appendChild(tooldiv);

    // UPARROW  IMAGE INPUT
    var upArrowElement = document.createElement("input");
    upArrowElement.type = 'image';
    upArrowElement.setAttribute('src', '../UPARROW.svg');
    upArrowElement.setAttribute('alt', 'MOVEUP');
    upArrowElement.setAttribute('width', '20');
    upArrowElement.setAttribute('height', '20');
    upArrowElement.id = "MOVEUP_" + elem.uid
    upArrowElement.addEventListener('click', (e: any) => { onMoveUp(e, array, divname, node, optype, modalTag) })
    tooldiv.appendChild(upArrowElement);
    opdiv.appendChild(tooldiv);

    // DOWNARROW  IMAGE INPUT
    var downArrowElement = document.createElement("input");
    downArrowElement.type = 'image';
    downArrowElement.setAttribute('src', '../DOWNARROW.svg');
    downArrowElement.setAttribute('alt', 'MOVEDOWN');
    downArrowElement.setAttribute('width', '20');
    downArrowElement.setAttribute('height', '20');
    downArrowElement.id = "MOVEDOWN_" + elem.uid
    downArrowElement.addEventListener('click', (e: any) => { onMoveDown(e, array, divname, node, optype, modalTag) })
    tooldiv.appendChild(downArrowElement);
    opdiv.appendChild(tooldiv);

    // OPERATION TYPE LABEL
    var label = document.createElement('label');
    label.innerHTML = "TYPE";
    label.style.cssText += 'padding:4px;';
    opdiv.appendChild(label);

    // OPERATION TYPE SELECT
    var selectList = document.createElement("select");
    selectList.id = elem.uid;
    if (elem.name != '')
        selectList.value = elem.name
    opdiv.appendChild(selectList);
    for (var i = 0; i < array.length; i++) {
        var option = document.createElement("option");
        option.value = array[i].name;
        option.text = array[i].name;
        if (elem.name != '' && elem.name == array[i].name)
            option.selected = true
        selectList.appendChild(option);
    }
    selectList.addEventListener('change', (e: any) => { onChange(e, node, optype) })

    opcontdiv.appendChild(opdiv);

    onAdd(elem, node, optype)

}

export function moveItem(node: any, to: any, from: any, type: any) {
    let item
    switch (type) {
        case "operations":
            item = node.data.operations[from];
            node.data.operations.splice(from, 1);
            node.data.operations.splice(to, 0, item);
            return node;
        case "machines":
            item = node.data.machines[from];
            node.data.machines.splice(from, 1);
            node.data.machines.splice(to, 0, item);
            return node;
        case "inputs":
            item = node.data.inputs[from];
            node.data.inputs.splice(from, 1);
            node.data.inputs.splice(to, 0, item);
            return node;
    }
};

function updateTotals(node: any) {
    // UPDATE NUMBER OF ITEMS
    const totals = document.getElementsByClassName("tool-counter")
    for (let i = 0; i < totals.length; i++) {
        const total = totals[i]
        total.value = 0
        switch (total.id) {
            case "total-inputs":
                if (node.data.inputs)
                    total.value = node.data.inputs.length
                break;
            case "total-machines":
                if (node.data.machines)
                    total.value = node.data.machines.length
                break;
            case "total-operations":
                if (node.data.operations)
                    total.value = node.data.operations.length
                break;
        }
    }
}

function onAdd(elem: any, node: any, type: any) {


    if (dataArrayIsNull(node, type))
        dataArrayInit(node, type)

    const found = dataArrayFind(node, elem.uid, type)
    if (!found) {
        dataArrayPush(node, elem, type)
    }

    updateTotals(node)

}

function onEdit(event: any, optype: any, modaltag: string) {
    const element = event.target
    let id: any
    if (element) {
        id = element.id.split('_')[1]
    }

    // OPEN MODAL DIV
    const modal = document.getElementById(modaltag);
    if (modal) {
        modal.setAttribute("data-optype", optype)
        modal.setAttribute("data-opuid", id)
        modal.style.display = "block";
    }
}

function onDelete(event: any, node: any, type: any) {
    const element = event.target
    let id: any
    if (element) {
        id = element.id.split('_')[1]



        const parent = element.parentElement.parentElement
        parent.innerHTML = ''

        node = dataArrayFilter(node, id, type)
        updateTotals(node)

    }
}

function onMoveUp(event: any, array: any, divname: any, node: any, type: any, modalTag: any = 'modal-editor-div-id') {
    const element = event.target
    let id: any
    if (element) {
        id = element.id.split('_')[1]

        const index = dataArrayFindIndex(node, id, type)
        if (index > 0)
            node = moveItem(node, index - 1, index, type)
        drawOperations(array, divname, node, type, modalTag)
    }
}

function onMoveDown(event: any, array: any, divname: any, node: any, type: any, modalTag: any = 'modal-editor-div-id') {
    const element = event.target
    let id: any
    if (element) {
        id = element.id.split('_')[1]

        const index = dataArrayFindIndex(node, id, type)
        if (index < dataArrayLength(node, type) - 1)
            node = moveItem(node, index + 1, index, type)
        drawOperations(array, divname, node, type, modalTag)
    }
}

function drawOperations(array: any, divname: any, node: any, type: any, modalTag: any = 'modal-editor-div-id') {
    if (node) {
        const opcontdiv = document.getElementById(divname)
        if (opcontdiv)
            opcontdiv.innerHTML = ''
        for (let i = 0; i < dataArrayLength(node, type); i++) {
            const elem = dataArrayGet(node, i, type)
            addElement(elem, array, divname, node, modalTag)
        }
    }
}

function onChange(event: any, node: any, type: any) {
    const element = event.target
    let id: any
    if (element) {
        id = element.id
        const index = dataArrayFindIndex(node, id, type)
        if (index > -1)
            dataArrayAssign(node, index, element.value, type)

    }
}

function dataArrayFilter(node: any, id: any, type: any) {
    let retArray = [];
    switch (type) {
        case "operations":
            if (node.data.operations) {
                retArray = node.data.operations.filter((item: any) => { return (item.uid != id) })
                node.data.operations = retArray
            }
            break
        case "machines":
            if (node.data.machines) {
                retArray = node.data.machines.filter((item: any) => { return (item.uid != id) })
                node.data.machines = retArray
            }
            break
        case "inputs":
            if (node.data.inputs) {
                retArray = node.data.inputs.filter((item: any) => { return (item.uid != id) })
                node.data.inputs = retArray
            }
            break
    }
    return node
}

function dataArrayFindIndex(node: any, id: any, type: any) {
    let index = -1;
    switch (type) {
        case "operations":
            if (node.data.operations)
                index = node.data.operations.findIndex((item: any) => { return (item.uid == id) })
            break
        case "machines":
            if (node.data.machines)
                index = node.data.machines.findIndex((item: any) => { return (item.uid == id) })
            break
        case "inputs":
            if (node.data.inputs)
                index = node.data.inputs.findIndex((item: any) => { return (item.uid == id) })
            break
    }
    return index
}

function dataArrayFind(node: any, id: any, type: any) {
    let ret = null
    switch (type) {
        case "operations":
            if (node.data.operations)
                ret = node.data.operations.find((item: any) => { return (item.uid == id) })
            break
        case "machines":
            if (node.data.machines)
                ret = node.data.machines.find((item: any) => { return (item.uid == id) })
            break
        case "inputs":
            if (node.data.inputs)
                ret = node.data.inputs.find((item: any) => { return (item.uid == id) })
            break
    }
    return ret
}

function dataArrayAssign(node: any, index: any, value: any, type: any) {
    switch (type) {
        case "operations":
            node.data.operations[index].name = value
            break
        case "machines":
            node.data.machines[index].name = value
            break
        case "inputs":
            node.data.inputs[index].name = value
            break
    }
}

function dataArrayGet(node: any, index: any, type: any) {
    let val: any = null
    switch (type) {
        case "operations":
            val = node.data.operations[index]
            break
        case "machines":
            val = node.data.machines[index]
            break
        case "inputs":
            val = node.data.inputs[index]
            break
    }
    return val
}

function dataArrayLength(node: any, type: any) {
    let length = 0
    switch (type) {
        case "operations":
            length = node.data.operations.length
            break
        case "machines":
            length = node.data.machines.length
            break
        case "inputs":
            length = node.data.inputs.length
            break
    }
    return length
}

function dataArrayInit(node: any, type: any) {
    switch (type) {
        case "operations":
            node.data.operations = []
            break
        case "machines":
            node.data.machines = []
            break
        case "inputs":
            node.data.inputs = []
            break
    }
}

function dataArrayIsNull(node: any, type: any) {
    let isNull = false
    switch (type) {
        case "operations":
            if (!node.data.operations)
                isNull = true
            break
        case "machines":
            if (!node.data.machines)
                isNull = true
            break
        case "inputs":
            if (!node.data.inputs)
                isNull = true
            break
    }
    return isNull
}

function dataArrayPush(node: any, elem: any, type: any) {
    switch (type) {
        case "operations":
            if (!node.data.operations)
                node.data.operations = []
            node.data.operations.push(elem)
            break
        case "machines":
            if (!node.data.machines)
                node.data.machines = []
            node.data.machines.push(elem)
            break
        case "inputs":
            if (!node.data.inputs)
                node.data.inputs = []
            node.data.inputs.push(elem)
            break
    }
}