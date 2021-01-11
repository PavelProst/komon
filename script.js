const segmentList = {
    st1zk: 'ZwiftKom',
    st1ek: 'EpicKom',
    st2pk: 'PetitKom',
    st6zk: 'EpicKom',
    st6vk: 'VolKom',
    st7yk: 'YorKom',
    st7yr: 'YorRev',
    st7yk2: 'YorKom2',
    st7yr2: 'YorRev2',
};
const segmentSystem = {
    st1zk: 'half',
    st1ek: 'full',
    st2pk: 'full',
    st6zk: 'half',
    st6vk: 'full',
    st7yk: 'half',
    st7yr: 'half',
    st7yk2: 'half',
    st7yr2: 'half',
};
const scorePoint = {
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

//генерация Race
let riderArrayR = {};
let R = doTable(segmentList);
riderArrayR = getUl(riderArrayR, 'R', 26);
generateTimeTable(riderArrayR, R, segmentList, scorePoint, segmentSystem);
renderTable(riderArrayR, R, segmentList, 'out-race');
//генерация W
let riderArrayW = {};
let W = doTable(segmentList);
riderArrayW = getUl(riderArrayW, 'W', 5);
generateTimeTable(riderArrayW, W, segmentList, scorePoint, segmentSystem);
renderTable(riderArrayW, W, segmentList, 'out-women');
//генерация S
let riderArrayS = {};
let S = doTable(segmentList);
riderArrayS = getUl(riderArrayS, 'S', 17);
generateTimeTable(riderArrayS, S, segmentList, scorePoint, segmentSystem);
renderTable(riderArrayS, S, segmentList, 'out-sportive');







