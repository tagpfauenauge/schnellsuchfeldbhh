import { cloneDeep } from "lodash";
import { BaseData, emptyBaseData } from "../AppState";
import { applyChanges } from "./combineBaseData";

const b1: BaseData = {
  versionDesc: {
    orgBudgetName: "Bundeshaushalt",
    budgetName: "BHH2021",
    lineName: "BGBl",
    modStateName: "vom 21.12.2020",
    timestamp: 1640044801000
  },
  firstYear: 2021,
  eplMap: {
    "01": {
      short: "01",
      name: "Bundespräsident und Bundespräsidialamt"
    }
  },
  hhsts: [
    {
      type: "hhst",
      epl: "01",
      kap: "01",
      gruppe: "232",
      suffix: "01",
      fkz: "187",
      zweck:
        "Beteiligung der Länder an der Deutschen Künstlerhilfe und sonstige ihr zugedachte Einnahmen",
      expense: false,
      sollJahr1: 0
    },
    {
      type: "hhst",
      epl: "01",
      kap: "01",
      gruppe: "381",
      suffix: "03",
      fkz: "890",
      zweck:
        "Verrechnungseinnahmen gemäß § 61 BHO außerhalb der Tit. 381 .1 und 381 .7",
      expense: false,
      sollJahr1: 0
    },

    {
      type: "hhst",
      epl: "01",
      kap: "11",
      gruppe: "119",
      suffix: "57",
      fkz: "018",
      tgKey: "0111TG57E",
      zweck: "Vermischte Einnahmen",
      expense: false,
      sollJahr1: 0
    },
    {
      type: "hhst",
      epl: "01",
      kap: "11",
      gruppe: "232",
      suffix: "57",
      fkz: "018",
      tgKey: "0111TG57E",
      zweck:
        "Beteiligung an den Versorgungslasten des Bundes",
      expense: false,
      sollJahr1: 190
    },

    {
      type: "hhst",
      epl: "01",
      kap: "11",
      gruppe: "542",
      suffix: "01",
      fkz: "013",
      zweck: "Öffentlichkeitsarbeit",
      expense: true,
      sollJahr1: 350
    },
    {
      type: "hhst",
      epl: "01",
      kap: "11",
      gruppe: "547",
      suffix: "09",
      fkz: "011",
      zweck:
        "Ausgaben für Vorhaben, die aus Spenden, Sponsoring und ähnlichen freiwilligen Geldleistungen finanziert werden",
      expense: true,
      sollJahr1: 0
    },
    {
      type: "hhst",
      epl: "01",
      kap: "11",
      gruppe: "431",
      suffix: "57",
      fkz: "018",
      tgKey: "0111TG57A",
      zweck:
        "Versorgungsbezüge der Bundespräsidenten und deren Hinterbliebenen",
      expense: true,
      sollJahr1: 1163
    },
    {
      type: "hhst",
      epl: "01",
      kap: "11",
      gruppe: "432",
      suffix: "57",
      fkz: "018",
      tgKey: "0111TG57A",
      zweck: "Versorgungsbezüge",
      expense: true,
      sollJahr1: 3810
    }
  ],
  kapMap: {
    "0101": {
      short: "01",
      name: "Bundespräsident"
    },
    "0111": {
      short: "11",
      name: "Zentral veranschlagte Verwaltungseinnahmen und -ausgaben"
    },
    "0112": {
      short: "12",
      name: "Bundespräsidialamt"
    }
  },
  tgMap: {
    "0111TG57E": {
      short: "57",
      name: "Versorgung der Beamtinnen und Beamten sowie der Richterinnen und Richter"
    },
    "0111TG57A": {
      short: "57",
      name: "Versorgung der Beamtinnen und Beamten sowie der Richterinnen und Richter"
    }
  }
};

const b2: BaseData = cloneDeep(b1);
b2.hhsts = [
  {
    type: "hhst",
    epl: "01",
    kap: "01",
    gruppe: "232",
    suffix: "01",
    fkz: "187",
    zweck:
      "Beteiligung der Länder an der Deutschen Künstlerhilfe und sonstige ihr zugedachte Einnahmen",
    expense: false,
    sollJahr1: 2000
  }
];

describe("tests for combineBaseData", () => {
  test("apply empty changes to empty origin", () => {
    const origin: BaseData = cloneDeep(emptyBaseData);
    const changes: BaseData = cloneDeep(emptyBaseData);
    changes.versionDesc = cloneDeep(origin.versionDesc);
    const result = applyChanges(origin, changes);
    expect(result).toEqual(emptyBaseData);
  });

  test("apply empty changes ", () => {
    const origin: BaseData = cloneDeep(b1);
    const changes: BaseData = cloneDeep(emptyBaseData);
    changes.versionDesc = cloneDeep(origin.versionDesc);
    const result = applyChanges(origin, changes);
    expect(result).toEqual(b1);
  });

  test("apply origin as changes ", () => {
    const origin: BaseData = cloneDeep(b1);
    const changes: BaseData = cloneDeep(b1);
    const result = applyChanges(origin, changes);
    expect(result).toEqual(b1);
  });

  test("apply to empty origin ", () => {
    const origin: BaseData = cloneDeep(emptyBaseData);
    const changes: BaseData = cloneDeep(b1);
    const result = applyChanges(origin, changes);
    expect(result).toEqual(b1);
  });
  
  test("apply single change to hhst (sollJahr1) ", () => {
    const origin: BaseData = cloneDeep(b1);
    const changes: BaseData = cloneDeep(b2);
    const result = applyChanges(origin, changes);
    expect(result.hhsts.length).toBe(b1.hhsts.length);
    expect(result.hhsts[0]).toEqual(b2.hhsts[0]);
    // otherwise the same as before
    result.hhsts[0] = b1.hhsts[0];
    expect(result).toEqual(b1);
  });
});
