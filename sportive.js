

let riderArrayS = {}, zwiftKomTableS = {}, zwiftKomRenderTableS = {};
zwiftEpicTableS = {}, zwiftEpicRenderTableS = {}; zwiftPetitTableS = {}, zwiftPetitRenderTableS = {};
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
    for (let i = 1; i < 18; i++) {
        name[i] = eval(`riderS${i}`);
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


riderArrayS = getUl(riderArrayS);

getSegmentTable(riderArrayS, zwiftKomTableS, 'st1zk');


getSortTable(zwiftKomTableS, zwiftKomRenderTableS);

for (let key in zwiftKomRenderTableS) {
    zwiftKomRenderTableS[key] = (Number(zwiftKomRenderTableS[key]) / 2);
}

getSegmentTable(riderArrayS, zwiftEpicTableS, 'st1ek');
getSortTable(zwiftEpicTableS, zwiftEpicRenderTableS);

getSegmentTable(riderArrayS, zwiftPetitTableS, 'st2pk');
getSortTable(zwiftPetitTableS, zwiftPetitRenderTableS);

//console.log(zwiftPetitTableS);
//console.log(zwiftPetitRenderTableS);

//console.log(zwiftKomTableS);
//console.log(zwiftKomRenderTableS);

//console.log(zwiftEpicTableS);
//console.log(zwiftEpicRenderTableS);

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

    let TempAr = (getSegmentTable(riders, zwiftKomTableS, 'st1zk'));
    let TempAr2 = (getSegmentTable(riders, zwiftEpicTableS, 'st1ek'));
    let TempAr3 = (getSegmentTable(riders, zwiftPetitTableS, 'st2pk'));

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

        if (zwiftKomRenderTableS[riderName] === undefined) zwiftKomRenderTableS[riderName] = 0;
        thRider += `<td>${zwiftKomRenderTableS[riderName]}</td>`;
        if (zwiftEpicRenderTableS[riderName] === undefined) zwiftEpicRenderTableS[riderName] = 0;
        thRider += `<td>${zwiftEpicRenderTableS[riderName]}</td>`;
        if (zwiftPetitRenderTableS[riderName] === undefined) zwiftPetitRenderTableS[riderName] = 0;
        thRider += `<td>${zwiftPetitRenderTableS[riderName]}</td>`;

        thRider += `<td>${zwiftEpicRenderTableS[riderName] + zwiftKomRenderTableS[riderName] + zwiftPetitRenderTableS[riderName]}</td>`;

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

renderResults(riderArrayS, 'out-sportive');