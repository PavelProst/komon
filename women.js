

let riderArrayW = {}, zwiftKomTableW = {}, zwiftKomRenderTableW = {};
zwiftEpicTableW = {}, zwiftEpicRenderTableW = {}; zwiftPetitTableW = {}, zwiftPetitRenderTableW = {};

/*
let segmentList = {
    st1zk: 'ZwiftKom',
    st1ek: 'EpicKom',
    st2pk: 'PetitKom'
};

let scorePoint = {
    1: 100,
    2: 90,
    3: 80,
    4: 70,
    5: 60,
    6: 50,
    7: 40,
    8: 30,
    9: 20,
    10: 10,
    11: 5,
    12: 4,
    13: 3,
    14: 2,
    15: 1,
};
*/
function getUl(name) {
    for (let i = 1; i < 6; i++) {
        name[i] = eval(`riderW${i}`);
    }
    return name;
};

function getSegmentTable(inputArray, outArray, segmentName) {
    let pushAr = {};
    let min = '', time = '', sec = '';
    for (let key in inputArray) {
        if (((inputArray[key][segmentName]) !== undefined) && (inputArray[key].finish === true)) {
            let pol = inputArray[key].name;
            let time = inputArray[key][segmentName].toString();
            min = parseInt(time.slice(0, time.indexOf(':'))) * 60 + Number(time.slice(time.indexOf(':') + 1, time.length));
            outArray[pol] = min;
        }
    }
    return outArray;
};

function getSortTable_old(inputTable, outTable) {
    let table = inputTable;
    //  for (let key in inputTable) {
    //      table[key] = inputTable[key];
    //  }
    place = 1
    minTime = 10000
    for (let i = 1; i < 16; i++) {
        for (let key in table) {
            if (table[key] < minTime) {
                minTime = table[key];
                outTable[key] = scorePoint[place];
                delete table[key];
                place++
            }
        }
        minTime = 10000;
    }
    return outTable;
};

function getSortTable(inputTable, outTable) {
    let table = inputTable;
    minTime = 10000;

    for (let place = 1; place < 16; place++) {
        for (let min in table) {
            if (table[min] < minTime) {
                minTime = table[min];
            }
        }
        for (let key in table) {
            if (minTime === table[key]) {
                outTable[key] = scorePoint[place];
                delete table[key];
                minTime = 10000;
            }
        }
    }
    return outTable;
}


riderArrayW = getUl(riderArrayW);

getSegmentTable(riderArrayW, zwiftKomTableW, 'st1zk');


getSortTable(zwiftKomTableW, zwiftKomRenderTableW);

for (let key in zwiftKomRenderTableW) {
    zwiftKomRenderTableW[key] = (Number(zwiftKomRenderTableW[key]) / 2);
}

getSegmentTable(riderArrayW, zwiftEpicTableW, 'st1ek');
getSortTable(zwiftEpicTableW, zwiftEpicRenderTableW);

getSegmentTable(riderArrayW, zwiftPetitTableW, 'st2pk');
getSortTable(zwiftPetitTableW, zwiftPetitRenderTableW);

//console.log(zwiftPetitTableW);
//console.log(zwiftPetitRenderTableW);

//console.log(zwiftKomTableW);
//console.log(zwiftKomRenderTableW);

//console.log(zwiftEpicTableW);
//console.log(zwiftEpicRenderTableW);

function renderResults(riders, div) {
    let renderTable = document.createElement('table');
    renderTable.classList.add('table-secondary');
    let thead = '';
    let trThead = '';
    let tBody = '';
    let trRider = '';
    let th = '<th class="col">Rider</th>';
    let thRider = ''
    let thSeg = ''
    let row = '';

    let TempAr = (getSegmentTable(riders, zwiftKomTableW, 'st1zk'));
    let TempAr2 = (getSegmentTable(riders, zwiftEpicTableW, 'st1ek'));
    let TempAr3 = (getSegmentTable(riders, zwiftPetitTableW, 'st2pk'));

    for (let riderName in TempAr) {
        thRider = `<th scope="row">${riderName}</th>`;


        TempAr[riderName] = parseInt(TempAr[riderName] / 60) + ':' + (TempAr[riderName] - parseInt(TempAr[riderName] / 60) * 60).toString().slice(0, 4);
        TempAr2[riderName] = parseInt(TempAr2[riderName] / 60) + ':' + (TempAr2[riderName] - parseInt(TempAr2[riderName] / 60) * 60).toString().slice(0, 4);
        TempAr3[riderName] = parseInt(TempAr3[riderName] / 60) + ':' + (TempAr3[riderName] - parseInt(TempAr3[riderName] / 60) * 60).toString().slice(0, 4);

        if (TempAr[riderName] === 'NaN:NaN') TempAr[riderName] = '-';
        if (TempAr2[riderName] === 'NaN:NaN') TempAr2[riderName] = '-';
        if (TempAr3[riderName] === 'NaN:NaN') TempAr3[riderName] = '-';

        thRider += `<td>${TempAr[riderName]}</td>`;
        thRider += `<td>${TempAr2[riderName]}</td>`;
        thRider += `<td>${TempAr3[riderName]}</td>`;

        if (zwiftKomRenderTableW[riderName] === undefined) zwiftKomRenderTableW[riderName] = 0;
        thRider += `<td>${zwiftKomRenderTableW[riderName]}</td>`;
        if (zwiftEpicRenderTableW[riderName] === undefined) zwiftEpicRenderTableW[riderName] = 0;
        thRider += `<td>${zwiftEpicRenderTableW[riderName]}</td>`;
        if (zwiftPetitRenderTableW[riderName] === undefined) zwiftPetitRenderTableW[riderName] = 0;
        thRider += `<td>${zwiftPetitRenderTableW[riderName]}</td>`;

        thRider += `<td>${zwiftEpicRenderTableW[riderName] + zwiftKomRenderTableW[riderName] + zwiftPetitRenderTableW[riderName]}</td>`;

        row += `<tr>${thRider}</tr>`;
    }
    for (let segmKey in segmentList) {
        //trRider += `<tr>${row}</tr>`;
        th += `<th  scope="col">${segmentList[segmKey]}</th>`;
    }
    th += `<th scope="col">ZK</th>`;
    th += `<th scope="col">EP</th>`;
    th += `<th scope="col">PK</th>`;
    th += `<th scope="col">SUM</th>`;

    trThead = `<tr>${th}</tr>`;
    thead += `<thead>${th}</thead>`;
    thead += `<tbody>${row}</tbody>`;

    renderTable.innerHTML = thead;
    document.getElementById(div).appendChild(renderTable);
}

renderResults(riderArrayW, 'out-women');