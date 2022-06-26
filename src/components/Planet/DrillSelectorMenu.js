import {
  SelectDrillMenu,
  SelectDrillMenuBody,
  SelectDrillMenuItem,
  SelectDrillMenuTitle,
} from "./PlanetStyles";

const DrillSelectorMenu = ({ selectDrill, ownedDrills }) => {
  return (
    <>
      <SelectDrillMenu>
        <SelectDrillMenuTitle>
          <h3>Select a drill</h3>
        </SelectDrillMenuTitle>
        <SelectDrillMenuBody>
          {ownedDrills.map((drill, index) => (
            <SelectDrillMenuItem
              onClick={() => selectDrill(drill.drillId)}
              key={index}
            >
              <img
                src={
                  "../../assets/asteroid-drill-levels/level-" +
                  drill.level +
                  "-level.png"
                }
                alt=""
              />
              <p>Asteroid Drill #{drill.drillId}</p>
              <img
                src={
                  "../../assets/asteroid-drill-levels/level-" +
                  drill.level +
                  "-power.png"
                }
                alt=""
              />
            </SelectDrillMenuItem>
          ))}
        </SelectDrillMenuBody>
      </SelectDrillMenu>
    </>
  );
};

export default DrillSelectorMenu;
