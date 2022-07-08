import {
  SelectDrillMenu,
  SelectDrillMenuBody,
  SelectDrillMenuItem,
  SelectDrillMenuTitle,
} from "./PlanetStyles";

const DrillSelectorMenu = ({ selectDrill, ownedDrills, drillsLoaded }) => {
  return (
    <>
      <SelectDrillMenu>
        <SelectDrillMenuTitle>
          <h3>Select a drill</h3>
        </SelectDrillMenuTitle>
        <SelectDrillMenuBody>
          {drillsLoaded ? (
            <>
              {ownedDrills.length === 0 ? (
                <>No Drills in your wallet! Visit the Market to buy drills.</>
              ) : (
                <>
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
                </>
              )}
            </>
          ) : (
            <SelectDrillMenuItem>Loading...</SelectDrillMenuItem>
          )}
        </SelectDrillMenuBody>
      </SelectDrillMenu>
    </>
  );
};

export default DrillSelectorMenu;
