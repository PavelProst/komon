
//  Функция для создания обьекта с гонщиками

function getUl(name, division, count) {
    for (let i = 1; i < count + 1; i++) {
        name[i] = eval(`rider${division}${i}`);
    }
    return name;
};

// Функция для обьявления таблиц результатов

function doTable(segmentArray) {
    let tablesObj = {}
    for (key in segmentArray) {
        tablesObj[key] = {};
        key = key + 'Point';
        tablesObj[key] = {};
    }
    return tablesObj;
}

//функция для заполнения таблицы временами и очками

function generateTimeTable(inputRiderArray, tableSegmentObj, segmentArray, pointTable, system) {
    for (let riderName in inputRiderArray) {
        for (let sgmName in segmentArray) {
            if (((inputRiderArray[riderName][sgmName]) !== undefined) && (inputRiderArray[riderName].finish === true)) {
                let time = inputRiderArray[riderName][sgmName].toString();
                let min = parseInt(time.slice(0, time.indexOf(':'))) * 60 + Number(time.slice(time.indexOf(':') + 1, time.length));
                tableSegmentObj[sgmName][inputRiderArray[riderName].name] = min;
                //tableSegmentObj[sgmName][inputRiderArray[riderName].name] = inputRiderArray[riderName][sgmName];
            }
        }
    }
    for (let sgmName in tableSegmentObj) {
        if (segmentArray.hasOwnProperty(sgmName)) {
            let minTime = 10000;
            for (let place = 1; place < 16; place++) {
                for (let riderName in tableSegmentObj[sgmName]) {
                    if (tableSegmentObj[sgmName][riderName] < minTime) {
                        minTime = tableSegmentObj[sgmName][riderName];
                    }
                }

                for (let riderName in tableSegmentObj[sgmName]) {
                    if (minTime === tableSegmentObj[sgmName][riderName]) {
                        let newTableName = [sgmName] + 'Point';
                        if (system[sgmName] === 'full') {
                            tableSegmentObj[newTableName][riderName] = pointTable[place];
                        } else {
                            tableSegmentObj[newTableName][riderName] = pointTable[place] / 2;
                        }

                        delete tableSegmentObj[sgmName][riderName];
                    }
                }
                minTime = 10000;
            }
        }
    }

    for (let riderName in inputRiderArray) {
        for (let sgmName in segmentArray) {
            //if (((inputRiderArray[riderName][sgmName]) !== undefined) && (inputRiderArray[riderName].finish === true)) {
            if (((inputRiderArray[riderName][sgmName]) !== undefined) && ((inputRiderArray[riderName][sgmName]) !== 'undefined')) {
                //let time = inputRiderArray[riderName][sgmName].toString();
                //let min = parseInt(time.slice(0, time.indexOf(':'))) * 60 + Number(time.slice(time.indexOf(':') + 1, time.length));
                //tableSegmentObj[sgmName][inputRiderArray[riderName].name] = min;
                tableSegmentObj[sgmName][inputRiderArray[riderName].name] = inputRiderArray[riderName][sgmName];
            } else tableSegmentObj[sgmName][inputRiderArray[riderName].name] = '-'
        }
    }
    return tableSegmentObj;
}

//генерация таблицы
function renderTable(inputRiderArray, tableSegmentObj, segmentArray, divOutId) {
    let renderTable = document.createElement('table');
    renderTable.classList.add('table-secondary');
    let thead = '';
    let th = '<th class="col">Фин</th><th class="col">Rider</th>';
    let thRider = ''
    let row = '';

    for (let riderName in inputRiderArray) {
        let sumPointsSegment = 0;
        if (inputRiderArray[riderName].finish === true) {
            thRider = `<th scope="row">+</td>`
        } else {
            thRider = `<th scope="row">-</td>`
        }
        thRider += `<th scope="row">${inputRiderArray[riderName].name}</td>`
        for (let sgmName in segmentArray) {

            if (segmentArray.hasOwnProperty(sgmName)) {
                thRider += `<td>${tableSegmentObj[sgmName][inputRiderArray[riderName].name]}</td>`
            }
        }
        for (let sgmName in tableSegmentObj) {
            if (sgmName.length > 7) {
                if (tableSegmentObj[sgmName][inputRiderArray[riderName].name] === undefined) tableSegmentObj[sgmName][inputRiderArray[riderName].name] = 0
                thRider += `<td>${tableSegmentObj[sgmName][inputRiderArray[riderName].name]}</td>`
                sumPointsSegment += tableSegmentObj[sgmName][inputRiderArray[riderName].name];
            }
        }
        thRider += `<td>${sumPointsSegment}</td>`;
        row += `<tr>${thRider}</tr>`;

    }


    for (let segmNameKey in segmentArray) {
        th += `<th scope="col">${segmentArray[segmNameKey]}</th>`;
    }
    for (let segmNameKey in segmentArray) {
        th += `<th scope="col">${segmentArray[segmNameKey][0]}P</th>`;
    }
    th += `<th scope="col">SUM</th>`;

    thead += `<thead>${th}</thead>`;
    thead += `<tbody>${row}</tbody>`;

    renderTable.innerHTML = thead;
    document.getElementById(divOutId).appendChild(renderTable);
}


