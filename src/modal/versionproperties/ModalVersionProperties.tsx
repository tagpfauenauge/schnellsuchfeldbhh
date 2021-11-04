import { FC, useState } from "react";
import { getVersionsSelectionFor } from "../../store/VersionsStore";
import { VersionDescriptor } from "../../store/VersionsTypes";
import { ModalVersionCategory } from "./ModalVersionCategory";
import { VersionProperties } from "./VersionProperties";

export type ModalVersionPropertiesProps = {
  versionProps: VersionProperties;

  /** should  hide the modal dialog */
  hideModal: () => void;
};

export const ModalVersionProperties: FC<ModalVersionPropertiesProps> =
  ({ hideModal, versionProps }) => {
    const [orgBudgetName, setOrgBudgetName] = useState(
      versionProps.basedata.versionDesc.orgBudgetName
    );
    const [budgetName, setBudgetName] = useState(
      versionProps.basedata.versionDesc.budgetName
    );
    const [lineName, setLineName] = useState(
      versionProps.basedata.versionDesc.lineName
    );
    const [modStateName, setModStateName] = useState(
      versionProps.basedata.versionDesc.modStateName
    );

    const versionDesc: VersionDescriptor = {
      orgBudgetName,
      budgetName,
      lineName,
      modStateName,
      timestamp: versionProps.basedata.versionDesc.timestamp
    };

    const versionSelection =
      getVersionsSelectionFor(versionDesc);
    return (
      <div className="modal is-active">
        <div
          className="modal-background"
          onClick={hideModal}
        ></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">
              {versionProps.fileName || "Import "}
              {` (${versionProps.basedata.hhsts.length})`}{" "}
            </p>
            <button
              className="delete"
              aria-label="close"
              onClick={hideModal}
            ></button>
          </header>
          <section className="modal-card-body">
            <ModalVersionCategory
              catName="Haushalt"
              currName={orgBudgetName}
              setCurrName={setOrgBudgetName}
              name2versions={versionSelection.orgBudgets}
            />
            <ModalVersionCategory
              catName="Haushaltsplan"
              currName={budgetName}
              setCurrName={setBudgetName}
              name2versions={versionSelection.budgets}
            />
            <ModalVersionCategory
              catName="Linie"
              currName={lineName}
              setCurrName={setLineName}
              name2versions={versionSelection.lines}
            />
            <ModalVersionCategory
              catName="Änderung"
              currName={modStateName}
              setCurrName={setModStateName}
              name2versions={versionSelection.modStates}
            />
          </section>
          <footer className="modal-card-foot">
            <button
              className="button is-success"
              onClick={() => {
                versionProps.basedata.versionDesc =
                  versionDesc;
                versionProps.addImportData(
                  versionProps.basedata,
                  false
                );
              }}
            >
              Import
            </button>
            <button className="button" onClick={hideModal}>
              Abbrechen
            </button>
          </footer>
        </div>
      </div>
    );
  };
