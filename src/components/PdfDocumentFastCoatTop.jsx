import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import {
  coverImage,
  fastCoatLogo,
  paulSignature,
  tomSignature,
} from "../assets/fastcoat-pdf";

const PDF_FONT = {
  regular: "Helvetica",
  bold: "Helvetica-Bold",
  italic: "Helvetica-Oblique",
};

const isSupportedPdfImage = (src) => {
  if (!src || typeof src !== "string") return false;
  return /^data:image\/(png|jpe?g);base64,/i.test(src);
};

const FULLY_PRIMED_SURFACES = [
  "Fibre Cement",
  "Concrete",
  "Existing Coatings",
  "Single-Ply",
  "GRP",
  "Metal",
];

const styles = StyleSheet.create({
  page: {
    paddingTop: 68,
    paddingRight: 38,
    paddingBottom: 64,
    paddingLeft: 38,
    fontFamily: PDF_FONT.regular,
    fontSize: 8.75,
    lineHeight: 1.27,
    color: "#171717",
  },
  cover: {
    padding: 0,
    fontFamily: PDF_FONT.regular,
    color: "#171717",
  },
  coverHero: {
    width: "100%",
    height: 275,
    objectFit: "cover",
  },
  coverBody: {
    paddingHorizontal: 58,
    paddingTop: 55,
    alignItems: "center",
  },
  coverLogo: {
    width: 330,
    marginBottom: 38,
  },
  coverTitle: {
    fontSize: 24,
    fontFamily: PDF_FONT.bold,
    letterSpacing: 0.7,
    marginBottom: 16,
    textAlign: "center",
  },
  coverReference: {
    fontSize: 17,
    color: "#666666",
    fontFamily: PDF_FONT.bold,
    textAlign: "center",
  },
  header: {
    position: "absolute",
    top: 24,
    left: 40,
    right: 40,
    height: 38,
    borderBottomWidth: 0.8,
    borderBottomColor: "#222222",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerReference: {
    width: "64%",
    fontSize: 12,
    color: "#5f5f5f",
  },
  bars: {
    width: 142,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  redBar: { width: 43, height: 4, backgroundColor: "#ef4136" },
  orangeBar: { width: 43, height: 4, backgroundColor: "#f7931e" },
  greenBar: { width: 43, height: 4, backgroundColor: "#39b54a" },
  h1: {
    fontSize: 14,
    fontFamily: PDF_FONT.bold,
    marginTop: 7,
    marginBottom: 6,
    color: "#231f20",
  },
  h2: {
    fontSize: 10.5,
    fontFamily: PDF_FONT.bold,
    marginTop: 5,
    marginBottom: 3,
  },
  h3: {
    fontSize: 9.5,
    fontFamily: PDF_FONT.bold,
    marginTop: 5,
    marginBottom: 2,
  },
  paragraph: { marginBottom: 3 },
  bullet: { marginBottom: 2, marginLeft: 14 },
  subBullet: { marginBottom: 2, marginLeft: 28 },
  important: {
    marginTop: 6,
    marginBottom: 6,
    fontFamily: PDF_FONT.bold,
    textAlign: "center",
  },
  contentsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.35,
    borderBottomColor: "#dddddd",
    paddingVertical: 2.5,
  },
  detailsTable: { marginBottom: 10 },
  detailsRow: {
    flexDirection: "row",
    borderBottomWidth: 0.35,
    borderBottomColor: "#dddddd",
    paddingVertical: 4,
  },
  detailsLabel: { width: "29%", fontFamily: PDF_FONT.bold },
  detailsValue: { width: "71%" },
  roofImage: {
    width: "100%",
    height: 255,
    objectFit: "contain",
    marginTop: 6,
    marginBottom: 8,
  },
  photosRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  photoCell: {
    width: "48.5%",
    height: 180,
    borderWidth: 0.6,
    borderColor: "#cccccc",
    padding: 4,
  },
  photo: { width: "100%", height: "100%", objectFit: "contain" },
  signatures: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 1,
  },
  signatureColumn: {
    width: "49%",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  signature: {
    width: 55,
    height: 22,
    objectFit: "contain",
    marginRight: 6,
  },
  signatureDetails: { flexGrow: 1 },
  signatureName: {
    fontSize: 6.8,
    lineHeight: 1.08,
    fontFamily: PDF_FONT.bold,
    marginBottom: 0.5,
  },
  signatureRole: {
    fontSize: 6.1,
    lineHeight: 1.08,
    marginBottom: 0.5,
  },
  signatureText: {
    fontSize: 6.1,
    lineHeight: 1.08,
  },
});

const H1 = (text, id) => ({ type: "h1", text, id });
const H2 = (text) => ({ type: "h2", text });
const H3 = (text) => ({ type: "h3", text });
const P = (text) => ({ type: "p", text });
const B = (text, level = 0) => ({ type: "bullet", text, level });
const I = (text) => ({ type: "important", text });

const FlowBlocks = ({ blocks }) => (
  <>
    {blocks.map((block, index) => {
      const key = `${block.type}-${index}`;
      if (block.type === "h1") {
        return (
          <Text
            key={key}
            id={block.id}
            bookmark={block.text}
            style={styles.h1}
            minPresenceAhead={28}
          >
            {block.text}
          </Text>
        );
      }
      if (block.type === "h2") {
        return (
          <Text key={key} style={styles.h2} minPresenceAhead={18}>
            {block.text}
          </Text>
        );
      }
      if (block.type === "h3") {
        return (
          <Text key={key} style={styles.h3} minPresenceAhead={12}>
            {block.text}
          </Text>
        );
      }
      if (block.type === "important") {
        return (
          <Text key={key} style={styles.important} orphans={1} widows={1}>
            {block.text}
          </Text>
        );
      }
      if (block.type === "bullet") {
        return (
          <Text
            key={key}
            style={block.level ? styles.subBullet : styles.bullet}
            orphans={1}
            widows={1}
          >
            {block.level ? "o" : "•"} {block.text}
          </Text>
        );
      }
      return (
        <Text key={key} style={styles.paragraph} orphans={1} widows={1}>
          {block.text}
        </Text>
      );
    })}
  </>
);

const COMMON_OPENING = [
  H1("Preliminaries and General Conditions", "preliminaries"),
  P("Before tendering the contractor should visit site and ascertain all local conditions and restrictions, accessibility, the full extent and nature of the work, the supply and conditions affecting labour and the execution of the contract generally, no claims arising from the failure to do so will be considered."),
  P("All roofing materials are to be supplied by LRS and to be fit for purpose and of the type and quality herein. Any sub-standard materials will be rejected. No alternatives are to be substituted."),
  P("The contractor shall employ none but LRS Approved, competent tradesman and the whole of the works shall be carried out and completed in accordance with the correct FastCoat Pro Specification."),
  H2("Waterproofing Only"),
  P("This specification is based on a waterproofing only overlay and of an existing roof covering and does not include thermal insulation."),
  H2("Measuring the Roof"),
  P("It is important to accurately measure your roof to determine the amounts of materials required. (Including a realistic amount for wastage – guide minimum 10% of the gross surface area)."),
  P("The roof area should include all areas to be coated including upstands and perimeter details etc."),
  H2("Existing Falls"),
  P("FastCoat will follow the contours of the existing surface. Falls and any deviations will be replicated. As a result, some areas of standing water may occur. Please note the accumulation of ice, frost or ponding water will not have an adverse effect on the FastCoat membrane. However good roofing practise suggests areas of ponding water should be eliminated."),
  P("This applies to the life expectancy and / or the long-term performance of the system and will not affect the product guarantee in any way."),
  H2("Change is Scope of Works"),
  P("LRS must be informed immediately of any proposed requirements to change, and the approved installer must not implement any changes until agreed by LRS."),
  P("LRS will not be responsible for any changes of which they are not aware of or have not authorised, nor will they accept any liability or associated cost due to system failure."),
  H2("Existing Roof Condition"),
  P("The existing roof build-up should be inspected for defects and made good where required."),
  P("Taking core samples of several random areas to obtain information of the sub-structure below the roof surface is highly recommended. This is the responsibility of the roofing contractor and could help prevent any unforeseen issues arising during or after application."),
  P("Any areas where the insulation or the underlying substrate has collapsed, is defective or decayed, should be cut out, repaired, and reinstated on a like-for-like basis to provide a good solid base for the new coating system."),
  P("No claims can be considered by Liquid Roofing Systems Ltd should there be any latent defects resulting from faulty decking or substrate."),
  H2("Natural Growth/Vegetation"),
  B("Remove all existing vegetation by mechanical extraction."),
  B("LRS 799 Wash-N-Prep may be used to remove stubborn staining / growth. Consult separate data sheet for more further information."),
  B("Wash off any 799 Wash-N-Prep residues before applying any LRS waterproof coatings."),
  B("1no. 799 Wash-N-Prep 1ltr bottle will clean approx. 148m² at a ratio of 16:1 with clean water."),
  B("799 Wash N Prep can be added to either a pump sprayer or as an attachment on a power washer."),
  B("For general cleaning add 250ml of 799 Wash N Prep to 4ltrs of clean water."),
  B("For heavy duty cleaning add 500ml of 799 Wash N Prep to 4ltrs of clean water."),
  B("Once applied the 799 Wash N Prep should be left for a minimum of 15 minutes to allow the stubborn stains to loosen."),
  B("The roof should be power washed using clean water to remove any loosened material and residue."),
  H2("Adhesion Test"),
  H3("Test Areas:"),
  P("Clean and remove all dust and contamination before performing test patches. The surface should be primed using the relevant primer and allowed to dry."),
  P("The contractor must document and record the identified test areas after applying the FastCoat Waterproof."),
  P("The FastCoat Waterproof must be allowed to fully cure for 7 Days prior to the adhesion test being undertaken."),
  P("This is to ensure all cleaning and preparation works have been carried out and completed to allow successful bonding of the liquid system in compliance with manufacturers specifications."),
  P("Should the adhesion test fail the contractor must inform LRS immediately upon their findings so that alternative measures can be agreed before the main works commence."),
  H2("Compliance with Building Regulations"),
  P("You should ensure that the design of the roof to which the FastCoat Pro is to be applied is in accordance with current regulations, codes and good practice."),
  P("For further guidance consult with:"),
  B("BS6229 (Code of Practice for flat roofs with continuously supported coverings)."),
  B("BS5250 (Control of Condensation in Buildings)."),
  B("Local Authority Building Control regarding compliance with regulations or seek professional advice."),
  H1("Flat Roof Detailing Guidance", "detailing"),
  P("Any redundant roof details should be removed prior to the commencement of works."),
  P("The roof area underneath should be made good as required, ensuring that it matches the build-up of the surrounding roof area."),
  P("Termination details should have a minimum 150mm upstand height above the finished surface of the roof and should be terminated into a chase or have a suitable cover flashing or weathering flange. Any details that are unable to meet the 150mm should be terminated using a termination bar or LRS PU mastic."),
  P("Any details where this cannot be achieved should be periodically inspected and may require occasional maintenance."),
  P("All detailing surfaces to be coated should be fully prepared and primed as per the main specification."),
  P("The Detailing should be dressed as far as possible into all outlets. (Minimum 150mm)."),
  P("Care should be taken to ensure all roof details comply with:"),
  B("BS 6229 Guidance (Flat Roofs with Continuously Supported Membranes)"),
  B("Guide 7.1 (Flat Roofs and Balconies) of the NHBC Standards 2020"),
  B("Liquid Roofing and Waterproofing Association Design Guide for Liquid Applied Waterproofing Systems for Roofs and Balconies, Issue 1, 2020"),
  H2("CDM"),
  P("CDM Regulations are applicable to all construction projects – commercial or domestic."),
  P("The Contractor’s responsibilities include:"),
  B("Ensuring that all employed/appointed workers have the skills, knowledge, training, and experience to carry out the works, or are in the process of obtaining them."),
  B("Providing appropriate supervision, information, and instructions to workers under their control."),
  P("Operatives should take an active part in helping to manage health and safety risks. Responsibilities include:"),
  B("Only carrying out construction work if they have the relevant skills, knowledge, training, and experience. Alternatively, operatives need to ensure that they are provided with the training and supervision that enables them to do their works safely and without risk to health."),
  H1("Safety Precautions", "safety"),
  P("Safety Equipment – Gloves, Goggles, Safety Boots, Hi-Viz and Face Mask – Please refer to the FastCoat MSDS."),
  P("Working from Heights – The Work from Height Regulations 2005"),
  H3("Safe Access - Safe access to a roof requires careful planning, particularly where work progresses along the roof."),
  P("Typical methods to access roofs are:"),
  B("general access scaffolds."),
  B("stair towers."),
  B("fixed or mobile scaffold towers."),
  B("mobile access equipment."),
  B("ladders; and"),
  B("roof access hatches."),
  B("Access should be installed and signed off by the appropriate access professional."),
  H3("Roof edges and openings"),
  P("Access requirements should meet HSE regulations and guidelines when working at heights."),
  H3("Fragile surfaces"),
  P("Always follow a safe system of work using a platform beneath the roof where possible. Work on or near fragile roof surfaces requires a combination of stagings, guard rails, fall restraint, fall arrest and safety nets slung beneath and close to the roof."),
  B("Fragile roofs: all roofs should be treated as fragile until a competent person has confirmed they are not. Do not trust any sheeted roof, whatever the material, to bear the weight of a person. This includes the roof ridge and purlins."),
  B("Fragile rooflights are a particular hazard. Some are difficult to see in certain light conditions and others may be hidden by paint. You must provide protection in these areas, either by using barriers or covers that are secured and labelled with a warning."),
  P("Electrical Hazards – Be aware of overhead power lines"),
  P("Protection of landscape Cars and Structures - Ensure all areas are covered that is not part of the roof works to avoid damage, especially when using chemical cleaners and liquid waterproofing products."),
  P("Handling Chemicals – Control of Substances Hazardous to Health (COSHH) Regulations 2002."),
  P("Temperature Limitations – +5°c to 35°c"),
];

const PREPARATION_BLOCKS = [
  H1("Preparation", "preparation"),
  P("Preparing a roof surface before applying FastCoat Waterproof is crucial for ensuring proper adhesion and longevity of the coating. Here are the steps to prepare a roof surface effectively:"),
  H3("1. Inspection"),
  B("Inspect the Roof: Look for any damage, such as cracks, blisters, or punctures. Note areas that require repair.", 1),
  B("Check for Moisture: Ensure the roof is completely dry. Moisture trapped under the coating can cause bubbling and poor adhesion.", 1),
  B("LRS recommend carrying out core samples to determine the condition of the existing build up.", 1),
  H3("2. Cleaning"),
  P("Please see page 12."),
  H3("3. Repairing"),
  B("Repair Damage: Fix any cracks, blisters, or punctures. Use appropriate materials such as LRS PU Mastic for minor repairs.", 1),
  B("Seal Joints and Seams: Use LRS PU Mastic to ensure all joints and seams are watertight.", 1),
  B("Replace Damaged Sections: If parts of the roofing material are severely damaged, they should be replaced like for like.", 1),
  H3("4. Final Preparations"),
  B("Masking: Protect areas that should not be coated using masking tape and protective coverings.", 1),
  B("Mixing the Coating: Mix the FastCoat Waterproof thoroughly before application.", 1),
  H3("5. Safety Measures – Please see page 9-10."),
  H1("Cleaning", "cleaning"),
  P("Objective: Ensure the roof surface is properly prepared for the application of FastCoat Pro Waterproof to achieve optimal adhesion and performance."),
  P("Safety Precautions: Please see pages 9-10."),
  H2("Cleaning Steps:"),
  H3("1. Clear Debris:"),
  B("Use a broom or leaf blower to remove loose debris such as leaves, twigs, and dirt.", 1),
  B("Check for and remove any nesting materials or other obstructions.", 1),
  H3("2. Pressure Washing:"),
  B("Use a 2000 psi pressure washer to thoroughly wash the roof. Start at the furthest point and work your way to your exit point", 1),
  H2("799 Wash N Prep"),
  H3("3. Apply 799 Wash N Prep if required:"),
  B("Mix 799 Wash N Prep at a ratio of 16:1 for general cleaning. 1 part 799 Wash N Prep and 16 parts clean water.", 1),
  B("Apply the 799 Wash N Prep to the roof using a pump sprayer or stiff-bristle brush. Allow to sit for 15-20 minutes before rinsing away with clean water.", 1),
  B("For stubborn stains, mix 1 part 799 Wash N Prep with 8 parts clean water and apply it to the affected areas. Let it sit for 15-20 minutes before rinsing with clean water.", 1),
  H3("4. Rinse Thoroughly:"),
  B("Rinse the roof thoroughly with clean water to remove all soap and cleaning solution residues.", 1),
  B("Ensure no cleaner is left behind as it can affect the adhesion of FastCoat Waterproof.", 1),
  H3("5. Inspect and Repair:"),
  B("Inspect the roof for any damage, such as cracks, splits, or holes. Repair minor issues with LRS PU Mastic.", 1),
  B("Ensure the roof surface is smooth and intact.", 1),
  H3("6. Drying:"),
  B("Allow the roof to dry completely before applying the waterproof coatings. This may take several hours to a full day, depending on weather conditions.", 1),
  H2("Final Steps:"),
  B("Documentation: Take photos before and after cleaning to document the condition of the roof."),
  H2("TV Aerials and Satellite Dish Arrays"),
  P("Any TV aerials or satellite arrays that will impede the roofing works will need to be temporarily removed or raised to facilitate the works."),
  P("The contractor must liaise with the client directly in relation to how to best serve the property so that minimal disturbance of service is achieved throughout the roof works."),
  H2("Cables"),
  P("If a cable tray is not currently in situ, then consideration should be made to keep the cables from direct contact with the membrane."),
];

const PRIMER_BLOCKS = [
  H2("MS 2-Part Primer:"),
  P("Priming the roof surface using MS 2-Part Primer is essential for ensuring proper adhesion of the FastCoat Waterproof coating, especially on various surfaces like metal, single-ply, GRP, glass, plastic, concrete, brickwork, fibre cement, and existing coatings."),
  H3("Steps to Prime the Surface:"),
  H3("1. Safety First – Please see pages 9-10."),
  H3("1. Surface Preparation"),
  B("Ensure the surface is clean, dry, and free from dust, debris, and grease.", 1),
  B("Follow the cleaning steps outlined previously if necessary. Please see page 12.", 1),
  H3("2. Measure the Area"),
  B("Measure the total area to be primed to ensure you mix the correct amount of MS 2-Part Primer.", 1),
  B("Remember that 12.5kg tin of MS 2-Part Primer covers 62.5m².", 1),
  H3("3. Mix the MS 2-Part Primer"),
  B("MS 2-Part Primer requires thorough mixing of its 2 components.", 1),
  B("Mix Part A with Part B, If part mixing then the mixing ratio would be 4:1 mix.", 1),
  B("Use a drill with mixing attachment or mixing stick for thorough mixing.", 1),
  H3("4. Apply the Primer"),
  B("Use a short pile roller to apply the MS 2-Part Primer evenly on the surface.", 1),
  B("Roll the MS 2-Part Primer in straight, even strokes to ensure uniform coverage.", 1),
  B("Pay attention to corners, edges, and seams to ensure they are adequately coated.", 1),
  H3("5. Maintain Coverage Rate"),
  B("Ensure you apply the MS 2-Part Primer at the recommended coverage rate of 0.2kg per m².", 1),
  B("A 12.5kg tin should cover 62.5m², so adjust the amount of MS 2-Part Primer used based on the area being covered.", 1),
  H3("6. Drying Time"),
  B("Allow the MS 2-Part Primer to dry, typically 4-6 hours before applying the FastCoat Waterproof coating.", 1),
  B("Drying times can vary based on environmental conditions like temperature and humidity.", 1),
  H3("7. Clean Up"),
  B("Clean tools and equipment.", 1),
  B("Dispose of any leftover primer and containers according to local regulations.", 1),
];

const DETAILS_BLOCKS = [
  H2("Existing Details, Terminations and Upstands:"),
  P("To ensure a durable and effective waterproofing system for a flat roof using FastCoat, it is essential to properly handle existing details, terminations, and upstands."),
  H3("Steps for Existing Details, Terminations, and Upstands:"),
  H3("1. Safety First – Please see pages 9-10."),
  H3("2. Preparation of Existing Details"),
  P("Please see page 11."),
  H3("3. Ensuring Proper Height for Upstands"),
  B("Upstands should be a minimum of 150mm high where possible to prevent water ingress.", 1),
  B("Measure the height and adjust if necessary to meet this requirement.", 1),
  H3("4. Applying FastCoat Waterproof Coating"),
  P("Please see page 16."),
  H3("5. Terminating the Waterproofing System"),
  B("There are four main methods to finishing the FastCoat Waterproof system: Leaving the membrane self-terminated, using a termination bar, lead flashing, or cutting into a chase filled with LRS PU Mastic.", 1),
  H3("Method 1: Self-terminating"),
  B("Mark the termination height of 150mm using a string line or masking tape."),
  B("Apply the FastCoat Waterproof to specification up to the termination line."),
  B("Ensure the FastCoat is fully bonded to the upstand leaving no voids or gaps which could allow water ingress."),
  B("Terminating the FastCoat is best practise, please see below other options."),
  H3("Method 2: Using a Termination Bar"),
  B("Measure and Cut: Measure and cut the termination bar to fit the length of the upstand."),
  B("Position the Bar: Position the termination bar at the top edge of the waterproof coating, ensuring it is at least 150mm above the roof surface."),
  B("Fasten the Bar: Secure the termination bar to the wall using suitable fixings."),
  B("Seal with LRS PU Mastic: Apply LRS PU Mastic along the top edge of the termination bar to seal it."),
  H3("Method 3: Using Lead Flashing"),
  B("Measure and Cut: Measure and cut the lead flashing to fit the length of the upstand."),
  B("Install Flashing: Install the lead flashing at the top edge of the FastCoat waterproof coating, ensuring it covers the termination of the coating."),
  B("Secure Flashing: Secure the lead flashing into the brickwork or wall by cutting a chase."),
  B("Seal with LRS PU Mastic: Apply LRS PU Mastic along the edges of the lead flashing and into the chase to seal it."),
  H3("Method 4: Cutting into a Chase and Filling with LRS PU Mastic"),
  B("Cut a Chase: Use a grinder or chisel to cut a chase (groove) into the wall at the top edge of the waterproof coating, at least 150mm above the roof surface."),
  B("Clean the Chase: Clean out the chase to remove dust and debris."),
  B("Waterproof: Apply FastCoat Waterproof into the chase to the correct FastCoat Specification."),
  B("Fill with LRS PU Mastic: Embed the top edge of the waterproof coating into the chase. Once dry, Fill the chase with LRS PU Mastic."),
  H3("6. Final Inspection"),
  B("Inspect all terminations and upstands to ensure they are properly sealed and finished.", 1),
  B("Check for any gaps or unsealed areas and repair where necessary.", 1),
];

const getBaseCoatBlocks = (isTwentyFiveYear) => [
  H2("FastCoat Waterproof as a Base Coat:"),
  P("Applying FastCoat Waterproof with Reinforcement Matting ensures a robust and durable waterproofing system for your flat roof."),
  H3("Steps for Applying FastCoat Waterproof and Reinforcement Matting:"),
  H3("1. Safety First – Please see pages 9-10."),
  H3("2. Surface Preparation"),
  B("Ensure the surface is clean, dry, and free from dust, debris, and grease.", 1),
  B("Follow the cleaning and priming steps outlined previously if necessary.", 1),
  H3("3. Mixing FastCoat Waterproof"),
  B("Thoroughly mix the FastCoat Waterproof prior to application. Use a drill and mixing attachment or mixing stick to ensure uniform consistency.", 1),
  H3("4. Measure and Cut Reinforcement Matting"),
  B("Measure the roof area and cut the Reinforcement Matting to size.", 1),
  B("Ensure edges are overlapped by approx. 50mm using the furry edge.", 1),
  H3("5. Application of FastCoat Waterproof"),
  B("First Section: Start with a manageable section of the roof.", 1),
  B("Coverage Rate: Apply the FastCoat Waterproof at a coverage rate of 1.5kg per m². Use a short pile roller or brush for even application.", 1),
  B(
    isTwentyFiveYear
      ? "Embed Reinforcement Matting: While the FastCoat Waterproof is still wet, embed the Reinforcement Matting into the FastCoat Waterproof. Ensure it lies flat and smooth without pinholes, wrinkles or air bubbles."
      : "Embed Reinforcement Matting: While the FastCoat Waterproof is still wet, embed the Reinforcement Matting into the FastCoat Waterproof. Ensure it lies flat and smooth without wrinkles or air bubbles.",
    1
  ),
  B("Overlap Matting: Overlap adjacent pieces of Reinforcement Matting by 50mm to ensure a continuous and strong layer.", 1),
  ...(!isTwentyFiveYear
    ? [
        H3("6. Embedment"),
        B("Use the roller to press the Reinforcement Matting firmly into the FastCoat Waterproof, ensuring good saturation and adhesion.", 1),
        B("Apply additional FastCoat Waterproof on top of the matting at a coverage rate of 0.5kg per m² to ensure it is fully saturated and covered. Once the Reinforcement Matting has broken down and is soft ensure the embedment is carried out to remove all pinholes.", 1),
      ]
    : []),
  H3(isTwentyFiveYear ? "6. Repeat Process" : "7. Repeat Process"),
  B("Move to the next section of roof and repeat the application process, ensuring each piece of matting overlaps the previous one by 50mm.", 1),
  H3(isTwentyFiveYear ? "7. Drying Time" : "8. Drying Time"),
  B("Allow the FastCoat Waterproof and Reinforcement Matting to dry, typically 2-4 hours before applying any topcoats or additional layers.", 1),
  H3(isTwentyFiveYear ? "8. Clean Up" : "9. Clean Up"),
  B("Clean tools and equipment.", 1),
  B("Dispose of any leftover materials and containers according to local regulations.", 1),
  H2("FastCoat Waterproof as a BaseCoat:"),
  P("Single component, moisture curing polyurethane."),
  P("Container Size – 25kg"),
  H3("Coverage Rates (Typical)"),
  P("2kg / m² (Smooth Surface) – 12.5m² / 25kg tin"),
  P(isTwentyFiveYear ? "2.2kg / m² (Rough Surface) – 11.1m² / 25kg tin" : "2.25kg / m² (Rough Surface) – 11.1m² / 25kg tin"),
  P("Allowance should be made for additional coverage rates for embedment of the Reinforcement Matting at low temperatures."),
  H3("Typical Drying Times at 15°c"),
  P("Touch Dry – 3 hours"),
  P("Minimum Over Coat – 4 hours"),
  P("Full Cure – 7 days"),
  H3("Storage"),
  P("FastCoat should be stored between 5°c and 20°c and kept out of the weather elements."),
  H3("Application Temperatures"),
  P("FastCoat is based on surface temperature and should be applied between +5°c and the maximum surface temperature is 35°c."),
];

const BASE_INSPECTION_BLOCKS = [
  H2("FastCoat BaseCoat – Inspect"),
  P("Inspecting the FastCoat Waterproof is a crucial step to ensure there are no imperfections such as pinholes or wicks that could compromise the waterproofing system."),
  H3("Steps for Inspecting and Repairing FastCoat Waterproof:"),
  H3("1. Safety First – Please see pages 9-10."),
  H3("2. Initial Inspection"),
  B("Visual Check: Begin with a visual inspection of the entire roof surface. Look for any visible defects such as pinholes, air bubbles, or wicks.", 1),
  B("Lighting: Use a flashlight or inspection light to illuminate the surface. This helps in identifying small pinholes and imperfections that may not be visible under normal lighting conditions.", 1),
  H3("3. Identifying Pinholes"),
  B("Mark Pinholes: As you identify pinholes, mark them with a marker or chalk to ensure they are easy to locate during the repair process.", 1),
  B("Check All Areas: Ensure you check all areas, including edges, corners, and around details where Reinforcement Matting has been used.", 1),
  H3("4. Repairing Pinholes"),
  B("Clean Area: Clean the area around the pinholes to ensure it is free from dust and debris.", 1),
  B("Apply LRS PU Mastic: Use a sealant gun to apply LRS PU Mastic into the pinholes. Ensure the mastic fills the hole completely.", 1),
  B("Smooth Surface: Smooth the LRS PU Mastic to ensure a level surface.", 1),
  H3("5. Dealing with Wicks or Fibres"),
  B("Sand Wicks: Lightly sand any wicks or fibres standing proud using 80 grit sandpaper. Sand gently to avoid damaging the surrounding FastCoat Waterproof.", 1),
  B("Clean Surface: Wipe the sanded area with a clean cloth to remove dust.", 1),
  H3("6. Ensuring Full Coverage"),
  B("Check Coverage: Ensure the entire roof area is coated with the FastCoat Waterproof and that Reinforcement Matting is properly embedded.", 1),
  B("Inspect Matting: Verify that all Reinforcement Matting is in place, fully saturated, and overlaps are correctly done by at least 50mm.", 1),
  H3("7. Detail Inspection"),
  B("Details and Edges: Pay attention to details and edges. Ensure all areas with Reinforcement Matting are thoroughly inspected and properly coated.", 1),
  B("Completed Details: Check that all details, such as terminations and upstands, are completed with Reinforcement Matting and properly coated.", 1),
  H3("8. Final Inspection"),
  B("Comprehensive Check: Perform a final comprehensive check of the entire roof area. Look for any missed spots or areas that may need additional attention.", 1),
  B("Repair as Needed: Address any remaining issues with LRS PU Mastic and ensure all repairs are smooth and level before recoating.", 1),
];

const MIDCOAT_BLOCKS = [
  H2("FastCoat MidCoat:"),
  H3("Steps for Applying FastCoat MidCoat:"),
  H3("1. Safety First – Please see pages 9-10."),
  H3("2. Inspect the BaseCoat"),
  B("Check for Pinholes: Ensure all pinholes have been filled and the surface is smooth.", 1),
  B("Clean Surface: Make sure the surface is clean and free from dust and debris. See page 14", 1),
  H3("3. Reactivation of the Surface (if required)"),
  B("If the BaseCoat has been left for more than 14 days, you must reactivate the surface using MS 2-Part Primer.", 1),
  B("Apply Primer: Apply the MS 2-Part Primer as per LRS instructions and allow it to dry completely before applying the FastCoat Waterproof.", 1),
  H3("4. Mixing the FastCoat MidCoat"),
  B("Thoroughly mix the FastCoat Waterproof before application. Use a drill with mixing attachment or mixing stick to ensure uniform consistency.", 1),
  H3("5. Application of FastCoat MidCoat"),
  B("Coverage Rate: Apply the FastCoat Waterproof at a coverage rate of 1kg per m².", 1),
  B("Even Application: Use a short pile roller or brush to apply the FastCoat Waterproof evenly. Ensure consistent thickness and avoid leaving streaks or thin spots.", 1),
  B("Consistent Strokes: Apply the FastCoat Waterproof in consistent, straight strokes to achieve an even finish.", 1),
  H3("6. Drying Time"),
  B("Allow the FastCoat Waterproof to dry for 2-4 hours, depending on environmental conditions such as temperature and humidity.", 1),
  H3("7. Final Inspection"),
  B("Even Coverage: Check the roof to ensure the FastCoat Waterproof has been applied evenly across the entire surface.", 1),
  B("Touch-ups: Perform any necessary touch-ups with additional FastCoat Waterproof to cover missed spots or thin areas.", 1),
  H2("FastCoat Waterproof as a MidCoat:"),
  P("Single component, moisture curing polyurethane."),
  P("Container Size – 25kg"),
  H3("Coverage Rates (Typical)"),
  P("1kg / m² (Smooth Surface) – 25m² / 25kg tin"),
  P("1.5kg / m² (Rough Surface) – 16.6m² / 25kg tin"),
  P("Allowance should be made for additional coverage rates for embedment of the Reinforcement Matting at low temperatures."),
  H3("Typical Drying Times at 15°c"),
  P("Touch Dry – 3 hours"),
  P("Minimum Over Coat – 4 hours"),
  P("Full Cure – 7 days"),
  H3("Storage"),
  P("FastCoat should be stored between 5°c and 20°c and kept out of the weather elements."),
  H3("Application Temperatures"),
  P("FastCoat is based on surface temperature and should be applied between +5°c and the maximum surface temperature is 35°c."),
];

const TOPCOAT_BLOCKS = [
  H2("FastCoat Waterproof as a TopCoat:"),
  P("Applying the FastCoat Waterproof is a critical final step in creating a durable and watertight flat roof."),
  H3("Steps for Applying FastCoat TopCoat:"),
  H3("1. Safety First – Please see pages 9-10."),
  H3("2. Inspect the BaseCoat"),
  B("Check for Pinholes: Ensure all pinholes have been filled and the surface is smooth.", 1),
  B("Clean Surface: Make sure the surface is clean and free from dust and debris. See page 14", 1),
  H3("3. Reactivation of the Surface (if required)"),
  B("If the BaseCoat has been left for more than 14 days, you must reactivate the surface using MS 2-Part Primer.", 1),
  B("Apply Primer: Apply the MS 2-Part Primer as per LRS instructions and allow it to dry completely before applying the FastCoat Waterproof.", 1),
  H3("4. Mixing the FastCoat TopCoat"),
  B("Thoroughly mix the FastCoat TopCoat before application. Use a drill with mixing attachment or mixing stick to ensure uniform consistency.", 1),
  H3("5. Application of FastCoat TopCoat"),
  B("Coverage Rate: Apply the FastCoat TopCoat at a coverage rate of 0.3kg per m².", 1),
  B("Even Application: Use a short pile roller or brush to apply the FastCoat TopCoat evenly. Ensure consistent thickness and avoid leaving streaks or thin spots.", 1),
  B("Consistent Strokes: Apply the FastCoat TopCoat in consistent, straight strokes to achieve an even finish.", 1),
  H3("6. Drying Time"),
  B("Allow the FastCoat TopCoat to dry for 2-4 hours, depending on environmental conditions such as temperature and humidity.", 1),
  H3("7. Final Inspection"),
  B("Even Coverage: Check the roof to ensure the FastCoat TopCoat has been applied evenly across the entire surface.", 1),
  B("Touch-ups: Perform any necessary touch-ups with additional FastCoat TopCoat to cover missed spots or thin areas.", 1),
  H2("FastCoat TopCoat:"),
  P("Single component Polyurethane, Solvent Based Aliphatic Coloured TopCoat."),
  P("Container Size – 5.5kg"),
  H3("Coverage Rates (Typical)"),
  P("0.3kg / m² (Smooth Surface) – 18.3m² / 5.5kg tin"),
  H3("Typical Drying Times at 15°c"),
  P("Touch Dry – 3 hours"),
  P("Minimum Over Coat – 4 hours"),
  P("Full Cure – 7 days"),
  H3("Storage"),
  P("FastCoat should be stored between 5°c and 20°c and kept out of the weather elements."),
  H3("Application Temperatures"),
  P("FastCoat is based on surface temperature and should be applied between +5°c and the maximum surface temperature is 35°c."),
];

const COMPLETED_ROOF_BLOCKS = [
  H1("Completed Roof Surface", "completed-roof"),
  H2("Guide to Visual Inspection of the Completed Roof Surface"),
  P("Objective: Conduct a thorough visual inspection of the completed roof surface to ensure there are no pinholes, the coverage is even, details are correctly applied at 150mm, and Reinforcement Matting is properly installed over the entire roof area."),
  P("Safety Precautions: Please see pages 9-10."),
  H3("Steps for Visual Inspection:"),
  H3("Initial Overview:"),
  B("Walk around the perimeter of the roof to get an initial overview of the surface.", 1),
  B("Take note of any obvious defects or areas that require closer inspection.", 1),
  H3("Check for Pinholes:"),
  B("Visual Scan: Perform a visual scan of the entire roof surface. Look closely for pinholes.", 1),
  B("Detailed Areas: Pay extra attention to seams, edges, and details where pinholes are more likely to occur.", 1),
  H3("Ensure Even Coverage:"),
  B("Uniform Thickness: Verify that the FastCoat Waterproof is consistent across the entire roof. There should be no thin spots or exposed substrate.", 1),
  B("Edges and Corners: Check edges, corners, and transitions to ensure they are fully coated and have no exposed areas.", 1),
  B("Colour Consistency: Look for colour consistency across the surface, as variations can indicate uneven application.", 1),
  H3("Inspect Details at 150mm:"),
  B("Measure Height: Use a measuring tape to check that details such as terminations, upstands, and other critical points are coated to a minimum height of 150mm where possible.", 1),
  B("Detail Work: Ensure all details are properly sealed and the FastCoat Waterproof is applied consistently at the required height.", 1),
  H3("Verify Reinforcement Matting:"),
  B("Visible Matting: Inspect areas where Reinforcement Matting was applied. The Reinforcement Matting should be fully embedded in the coating with no exposed edges.", 1),
  B("Coverage: Ensure the Reinforcement Matting extends to cover all critical areas, such as joints, seams, and around roof penetrations.", 1),
  B("Bonding: Check that the Reinforcement Matting is well-bonded to the substrate and there are no air pockets or wrinkles.", 1),
  H3("Final Checks:"),
  B("Seams and Joints: Verify that all seams and joints are fully sealed and there are no gaps or openings.", 1),
  B("Overall Condition: Assess the overall condition of the roof surface. Ensure it looks uniform and well-maintained.", 1),
  H3("Document Findings:"),
  B("Photographic Evidence: Take photos of the roof surface, especially any areas of concern or interest. Capture before and after images if any touch-up work is required.", 1),
  B("Detailed Notes: Write detailed notes on your findings, including any defects, areas that need additional work, and the overall condition of the roof.", 1),
  H2("Addressing Issues:"),
  B("Pinholes: Mark any pinholes with chalk or tape. Prepare a small amount of LRS PU Mastic to fill in the pinholes before reapplying FastCoat Waterproof."),
  B("Uneven Coverage: Apply additional FastCoat Waterproof to any areas with insufficient coverage to achieve uniform thickness."),
  B("Detail Adjustments: Correct any issues with details that are not at the required 150mm height where possible. Apply additional coating if necessary."),
  B("Reinforcement Matting: Ensure any improperly applied Reinforcement Matting is corrected by applying additional FastCoat Waterproof and embedding new Reinforcement Matting as needed."),
];

const TRAFFIC_COAT_BLOCKS = [
  H2("Traffic Coat Previsions for walkways, maintenance routes etc.:"),
  P("Once the LRS FastCoat Waterproof has fully cured, Traffic Coat can be applied."),
  P("LRS Traffic Coat is applied in 2 coats (Holding Layer & Seal Coat) and typically cures in 30 mins."),
  P("Holding Layer is applied @ 0.2kg m² and while Traffic Coat is still wet immediately broadcast to saturation, completely blinding the surface with 3kg m² of Emery Aggregate."),
  P("Once the Base Layer has fully cured, typically in 30 minutes, the contractor will need to brush and bag up all the loose aggregate before applying the Seal Coat."),
  P("Seal Coat is applied at 0.2kg m² ensuring the aggregate is encapsulated."),
  P("Ensure all masking tape is removed once the walkway is complete and the Seal Coat is still wet to leave a crisp edge."),
  I("TAKE IMAGES OF EACH STEP OF THE ABOVE IF APPLYING FOR A PRODUCT GUARANTEE"),
];

const GENERAL_BLOCKS = [
  H1("General Guidance and Requirements", "general-guidance"),
  H2("Drying Out – Equipment:"),
  P("These are readily available commercially from local tool plant hire companies."),
  P("Leaf Blowers"),
  P("Hot Air Blower"),
  P("Roof Pumps"),
  H2("Defects:"),
  P("This specification provided by LRS is written on the basis that the substrates, roof deck and structures are sound and suitable. We cannot accept responsibility for the consequences of defects in the roof deck or structure."),
  H2("Installation:"),
  P("All LRS Waterproofing Systems are to be installed in accordance with this specification."),
  H2("Building Works:"),
  P("It is the contractor’s responsibility to ensure suitable protection of semi-completed or completed works."),
  H2("Protection of Works:"),
  P("It is the contractor’s responsibility to ensure any relating plant, equipment or materials being stored or placed onto the waterproofing membrane are sufficiently protected."),
  H2("Delays:"),
  P("All or general areas: Overcoating must be carried out within 14 days of the application of the preceding coat (Primer or Waterproofing)."),
  P("Coatings that are over 14 days will need to be re-activated using LRS MS 2-Part Primer at a coverage of 0.2kg per m²."),
  H1("General Guidance - requirements"),
  H2("Prepared Surfaces – Requirement:"),
  P("Prepared surfaces and substrates to receive the new FastCoat Pro Waterproofing Membrane must be prepared all in accordance with this specification and must be clean from all dirt, dust and loose materials. In addition, all surfaces must be dry before application."),
  H2("Storage:"),
  P("All LRS materials must always be stored indoors between 5°c and 20°c."),
  P("Note: Coverage rates are adversely affected by high and low application temperatures."),
  H2("Safe Working:"),
  P("All works are to be carried out in accordance with the current Health and Safety Legislation. Please see pages 9-10."),
  H2("Inclement Weather Protection:"),
  P("If rain is due no LRS Waterproofing coatings should be laid."),
  P("The contractor must ensure at the end of each day that any exposed membranes or substrates that are susceptible to damage through water ingress are sealed and protected to ensure complete water tightness."),
];

const formatDate = (value) => {
  if (!value) return "TBC";
  const parsed = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const DetailRow = ({ label, value }) => (
  <View style={styles.detailsRow}>
    <Text style={styles.detailsLabel}>{label}</Text>
    <Text style={styles.detailsValue}>{value || "TBC"}</Text>
  </View>
);

const PdfHeader = ({ reference }) => (
  <View fixed style={styles.header}>
    <Text style={styles.headerReference}>{reference || "Project Reference"}</Text>
    <View style={styles.bars}>
      <View style={styles.redBar} />
      <View style={styles.orangeBar} />
      <View style={styles.greenBar} />
    </View>
  </View>
);

const Contents = ({ isTwentyFiveYear, isFullyPrimed, hasTrafficCoat, hasPhotos }) => {
  const items = [
    "Project details",
    "Preliminaries & general conditions",
    "Existing falls, change in scope of works, existing roof condition",
    "Natural growth, adhesion test, compliance with building regulations",
    "Flat roof detailing guidance & CDM",
    "Roof specification",
    "The roof build-up and preparation",
    "Cleaning, TV, satellite arrays, cables",
    ...(isFullyPrimed ? ["MS 2-Part Primer"] : []),
    "Existing details, terminations and upstands",
    "FastCoat Waterproof as a BaseCoat",
    ...(isTwentyFiveYear ? ["FastCoat MidCoat"] : []),
    "FastCoat TopCoat",
    "Completed roof surface",
    ...(hasTrafficCoat ? ["Traffic Coat"] : []),
    "General guidance and requirements",
    "Maintenance after installation",
    ...(hasPhotos ? ["Photographs"] : []),
    "Materials and guarantee",
  ];

  return (
    <>
      <Text style={styles.h1} bookmark="Contents" minPresenceAhead={28}>
        Contents
      </Text>
      {items.map((item) => (
        <View key={item} style={styles.contentsRow}>
          <Text>{item}</Text>
        </View>
      ))}
    </>
  );
};

const Photographs = ({ photos }) => {
  if (!photos?.length) return null;
  const rows = [];
  for (let index = 0; index < Math.min(photos.length, 4); index += 2) {
    rows.push(photos.slice(index, index + 2));
  }
  return (
    <>
      <Text id="photographs" bookmark="Photographs" style={styles.h1} minPresenceAhead={24}>
        Photographs
      </Text>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.photosRow} wrap={false}>
          {row.map((src, imageIndex) => (
            <View key={imageIndex} style={styles.photoCell}>
              <Image src={src} style={styles.photo} />
            </View>
          ))}
        </View>
      ))}
    </>
  );
};

const PdfDocumentFastCoatTop = ({
  reference,
  date,
  roofSize,
  attention,
  preparedBy,
  guarantee,
  surface,
  image,
  lrsReference,
  roofType,
  uValue,
  outlets,
  skylights,
  acUnits,
  existingCoatings,
  pondingWater,
  antiSkid,
  photos = [],
  roofBuildUp,
}) => {
  const isTwentyFiveYear = guarantee === "25-year";
  const isFullyPrimed = FULLY_PRIMED_SURFACES.includes(surface);
  const hasTrafficCoat = String(antiSkid || "").toLowerCase() === "yes";
  const safeProjectImage = isSupportedPdfImage(image) ? image : null;
  const safePhotos = photos.filter(isSupportedPdfImage).slice(0, 4);

  let user = {};
  try {
    user = JSON.parse(localStorage.getItem("user") || "{}") || {};
  } catch {
    user = {};
  }

  const preparedByName = preparedBy || user.name || "Paul Jones";
  const preparedByRole = user.role || "Technical Manager";
  const preparedByPhone = user.phone || "T: 01948 841 877";
  const preparedByEmail = user.email || "E: paul.jones@lrs-systems.co.uk";
  const warrantyLabel = isTwentyFiveYear ? "25-year" : "20-year";
  const specificationName = isTwentyFiveYear
    ? "FastCoat Pro 25 Specification"
    : "FastCoat Pro 20 Specification";
  const roofReference = reference || "Project Reference";

  return (
    <Document
      title={`${roofReference} - ${specificationName}`}
      author="Liquid Roofing Systems Ltd"
      subject="FastCoat Installation Specification"
    >
      <Page size="A4" style={styles.cover}>
        <Image src={coverImage} style={styles.coverHero} />
        <View style={styles.coverBody}>
          <Image src={fastCoatLogo} style={styles.coverLogo} />
          <Text style={styles.coverTitle}>INSTALLATION SPECIFICATION</Text>
          <Text style={styles.coverReference}>{roofReference.toUpperCase()}</Text>
        </View>
      </Page>

      <Page size="A4" style={styles.page} wrap>
        <PdfHeader reference={roofReference} />

        <Contents
          isTwentyFiveYear={isTwentyFiveYear}
          isFullyPrimed={isFullyPrimed}
          hasTrafficCoat={hasTrafficCoat}
          hasPhotos={safePhotos.length > 0}
        />

        <Text id="project-details" bookmark="Project details" style={styles.h1} minPresenceAhead={30}>
          Project details
        </Text>
        <View style={styles.detailsTable}>
          <DetailRow label="Specification" value={specificationName} />
          <DetailRow label="LRS reference" value={lrsReference || "LRS – [ref]"} />
          <DetailRow label="Date" value={formatDate(date)} />
          <DetailRow label="Project reference" value={roofReference} />
          <DetailRow label="Roof size" value={roofSize} />
          <DetailRow label="For the attention of" value={attention} />
          <DetailRow label="Prepared by" value={`${preparedByName}\n${preparedByRole}\n${preparedByPhone}\n${preparedByEmail}`} />
        </View>

        <FlowBlocks blocks={COMMON_OPENING} />

        <Text id="roof-specification" bookmark="Roof specification" style={styles.h1} minPresenceAhead={24}>
          Roof Specification
        </Text>
        <Text style={styles.paragraph}>Roof areas covered in this specification: {roofReference}</Text>
        {safeProjectImage && (
          <View wrap={false}>
            <Image src={safeProjectImage} style={styles.roofImage} />
          </View>
        )}

        <Text style={styles.h2} minPresenceAhead={18}>The Roof Build Up</Text>
        <Text style={styles.paragraph}>
          With the information and images provided this specification is for {roofReference}.
        </Text>
        {roofBuildUp && <Text style={styles.paragraph}>{roofBuildUp}</Text>}
        <Text style={styles.paragraph}>
          LRS have been brought in to provide a {warrantyLabel} product guarantee using FastCoat Pro.
        </Text>
        <Text style={styles.paragraph}>
          The correct HSE approved access and safety systems should be implemented to ensure a safe working environment for all employees.
        </Text>

        <Text style={styles.h2} minPresenceAhead={20}>Roof Survey Details</Text>
        <View style={styles.detailsTable}>
          <DetailRow label="Surface" value={surface} />
          <DetailRow label="Roof type" value={roofType} />
          {roofType === "Warm Roof" && <DetailRow label="U Value" value={uValue} />}
          <DetailRow label="Outlets" value={outlets} />
          <DetailRow label="Skylights" value={skylights} />
          <DetailRow label="A/C units" value={acUnits} />
          <DetailRow label="Existing coatings" value={existingCoatings} />
          <DetailRow label="Ponding water" value={pondingWater} />
          <DetailRow label="Traffic Coat" value={antiSkid} />
        </View>

        <FlowBlocks blocks={PREPARATION_BLOCKS} />

        <Text id="waterproofing-coverings" bookmark="Waterproofing Coverings" style={styles.h1} minPresenceAhead={24}>
          Waterproofing Coverings
        </Text>
        {isFullyPrimed && <FlowBlocks blocks={PRIMER_BLOCKS} />}
        <FlowBlocks blocks={DETAILS_BLOCKS} />
        <FlowBlocks blocks={getBaseCoatBlocks(isTwentyFiveYear)} />
        <FlowBlocks blocks={BASE_INSPECTION_BLOCKS} />
        {isTwentyFiveYear && <FlowBlocks blocks={MIDCOAT_BLOCKS} />}
        <FlowBlocks blocks={TOPCOAT_BLOCKS} />
        <FlowBlocks blocks={COMPLETED_ROOF_BLOCKS} />
        {hasTrafficCoat && <FlowBlocks blocks={TRAFFIC_COAT_BLOCKS} />}
        <FlowBlocks blocks={GENERAL_BLOCKS} />

        <Text id="maintenance" bookmark="Maintenance After Installation" style={styles.h1} minPresenceAhead={24}>
          Maintenance After Installation
        </Text>
        <Text style={styles.paragraph}>
          The new roof coverings should be managed in accordance with the recommendations of BS6229:2003 with regards to ongoing maintenance.
        </Text>
        <Text style={styles.paragraph}>
          They should be routinely inspected and cleared of any debris every spring and autumn. This will need to be undertaken more often if the roof is surrounded by trees etc.
        </Text>
        <Text style={styles.paragraph}>
          Please note that failure to follow maintenance guidelines can invalidate the product guarantee.
        </Text>
        <Text style={styles.h2}>Guarantee – Materials Only</Text>
        <Text style={styles.paragraph}>
          Materials only. The following guarantee specification is covered by LRS product guarantee for the period of {warrantyLabel}s from the date of practical completion.
        </Text>
        <Text style={styles.paragraph}>
          Please Note: Only Waterproofing products supplied by LRS will be covered in this guarantee.
        </Text>

        <Photographs photos={safePhotos} />

        <Text id="materials" bookmark="Materials and guarantee" style={styles.h1} minPresenceAhead={24}>
          Materials
        </Text>
        <Text style={styles.paragraph}>TBC</Text>
        <Text style={styles.h2}>Guarantee:</Text>
        <Text style={styles.paragraph}>
          Materials only. The following guarantee-specification is covered by LRS product guarantee for the period of {warrantyLabel}s from the date of practical completion.
        </Text>
        <Text style={styles.paragraph}>
          Please Note: Only products supplied by LRS will be covered in this guarantee.
        </Text>
        <Text style={styles.h2}>Kind Regards</Text>

        <View style={styles.signatures} wrap={false}>
          <View style={styles.signatureColumn}>
            <Image src={paulSignature} style={styles.signature} />
            <View style={styles.signatureDetails}>
              <Text style={styles.signatureName}>Paul Jones</Text>
              <Text style={styles.signatureRole}>LRS Technical Manager</Text>
              <Text style={styles.signatureText}>T: 01948 841 877</Text>
              <Text style={styles.signatureText}>E: paul.jones@lrs-systems.co.uk</Text>
              <Text style={styles.signatureText}>W: www.lrs-systems.co.uk</Text>
            </View>
          </View>
          <View style={styles.signatureColumn}>
            <Image src={tomSignature} style={styles.signature} />
            <View style={styles.signatureDetails}>
              <Text style={styles.signatureName}>Tom Shone</Text>
              <Text style={styles.signatureRole}>Managing Director</Text>
              <Text style={styles.signatureText}>T: 07415116280</Text>
              <Text style={styles.signatureText}>E: tomshone@lrs-systems.co.uk</Text>
              <Text style={styles.signatureText}>W: www.lrs-systems.co.uk</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PdfDocumentFastCoatTop;