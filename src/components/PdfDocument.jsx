import React from 'react';
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
  Font
} from '@react-pdf/renderer';
import { Svg, Polygon } from '@react-pdf/renderer';



// Estilos PDF
const styles = StyleSheet.create({
  page: {
    padding: 60,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  header: {
    fontSize: 16,
    color: '#4c4c4c',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#231f20',
    letterSpacing: 1,
    textAlign: 'center',
    marginTop: 20,
  },
  line: {
    width: 40,
    height: 3,
    marginHorizontal: 2,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
    width: 200,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#231f20',
    marginBottom: 10,
  },
  listItem: {
    marginLeft: 10,
    marginBottom: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 60,
    right: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const getGuaranteeText = (guarantee) => {
    return guarantee === '20-year'
      ? 'RapidRoof Pro 20 Specification'
      : 'RapidRoof 10 Specification';
  };

  const surfaceTexts = {
    Asbestos: "Ensure surface is cleaned and all loose material removed. Use primer for adhesion.",
    Concrete: "Concrete must be fully cured and primed for proper bonding of the system.",
    "Existing Coatings": "Inspect coating integrity and clean surface thoroughly before application.",
    "Single-Ply": "Use primer designed for flexible membrane adhesion on single-ply surfaces.",
    VCL: "Vapour Control Layers must be sealed and intact before proceeding.",
    Asphalt: "Asphalt must be stable and primed with bitumen-compatible primer.",
    Felt: "Felt should be clean, dry and firmly bonded. Apply appropriate primer.",
    GRP: "GRP surface must be abraded and cleaned before applying primer.",
    Metal: "Remove rust, degrease, and apply metal primer.",
    Timber: "Timber must be dry and structurally sound. Prime before coating."
  };
  
  
  const PdfDocument = ({
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
  pondingWater
  }) => {
    const guaranteeText = getGuaranteeText(guarantee);
    const surfaceText = surfaceTexts[surface] || '';
  
    const PdfHeader = ({ reference }) => (
      <>
        <View style={{
          marginHorizontal: -40,
          marginTop: -40,
          paddingHorizontal: 40,
          paddingTop: 30,
          marginBottom: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#4a84b5' }}>
            {reference || 'Project Name Here'}
          </Text>
    
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: '#ef4136', marginHorizontal: 5 }} />
            <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: '#f7931e', marginHorizontal: 5 }} />
            <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: '#39b54a', marginHorizontal: 5 }} />
          </View>
        </View>
    
        <View style={{ height: 1, backgroundColor: '#000', marginBottom: 20, width: '100%' }} />
      </>
    );
    
    const PdfFooter = ({ guarantee }) => (
      <>
        <View style={{
          height: 1,
          backgroundColor: '#000',
          position: 'absolute',
          bottom: 130,
          left: 0,
          right: 0
        }} />
    
        <View style={{
          position: 'absolute',
          bottom: 0,
          left: 40,
          right: 40,
          paddingVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Image src="https://i.postimg.cc/WhWy9YdP/lrs-1.png" style={{ width: 160 }} />
          <Image
            src={
              guarantee === '20-year'
                ? "https://i.postimg.cc/SnnvHL9Y/20y-1.png"
                : "https://i.postimg.cc/yD2bKJhQ/10y-1.png"
            }
            style={{ width: 160 }}
          />
        </View>
      </>
    );


  return (
    <Document>

           {/* Página 1: Portada */}

           <Page size="A4" style={{ padding: 0, margin: 0 }}>
  {/* Imagen superior (sin padding) */}
  <Image src="/techo.png" style={{ width: '100%' }} />

  {/* Contenido central más protagonista */}
  <View style={{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    textAlign: 'center'
  }}>
    {/* Logo: MUCHO más grande */}
    <Image
      src={guarantee === '20-year' ? '/20y.png' : '/10y.png'}
      style={{ width: 340, marginBottom: 40 }}
    />

    {/* Título: más peso y tamaño */}
    <Text style={{
      fontSize: 26,
      fontWeight: 'bold',
      color: '#000',
      marginBottom: 18
    }}>
      INSTALLATION SPECIFICATION
    </Text>

    {/* Project Reference: más grande y azul plomo */}
    <Text style={{
      fontSize: 18,
      fontWeight: 'bold',
      color: '#4a84b5'
    }}>
      {reference?.toUpperCase() || 'PROJECT REFERENCE'}
    </Text>
  </View>
</Page>

       {/* Página 2: Content */}

       <Page size="A4" style={styles.page}>
       <PdfHeader reference={reference} />

  {/* Título */}
  <Text style={styles.sectionTitle}>Contents</Text>

  {/* Tabla de contenidos */}
  {[
    ['Project details', '3'],
    ['Preliminaries & general conditions', '4'],
    ['Existing falls, change in scope of works, existing roof condition', '5'],
    ['Natural growth, adhesion test, compliance with building regulations', '6'],
    ['Flat roof detailing guidance & CDM', '7'],
    ['Roof specification', '8'],
    ['The roof build-up and preparation', '9'],
    ['Cleaning, TV, satellite arrays, cables', '10'],
    ['Crack & joint filler, cables and ponding filler', '11–12'],
    ['Waterproof coverings', '13–18'],
    ['Schedule of products', '19'],
    ['Additional information', '20'],
    ['General guidance and requirements', '21–23'],
    ['Photographs', '24'],
    ['Materials and guarantee', '25'],
  ].map(([label, page], idx) => (
    <View key={idx} style={styles.tableRow}>
      <Text>{label}</Text>
      <Text>{page}</Text>
    </View>
  ))}

   {/* Pie de página */}
   <PdfFooter guarantee={guarantee} />
</Page>



      {/* Página 3: Detalles del Proyecto */}
      <Page size="A4" style={styles.page}>
      <PdfHeader reference={reference} />

  {/* Título principal */}
<Text style={[styles.sectionTitle, { fontSize: 18, marginBottom: 30 }]}>
  {guarantee === '20-year'
    ? 'RapidRoof Pro 20 Specification'
    : 'RapidRoof 10 Specification'} Ref: {lrsReference || 'LRS – [ref]'}
</Text>

{/* Tabla de información */}
<View style={{ flexDirection: 'row', gap: 40 }}>
  {/* Columna izquierda: etiquetas */}
  <View style={{ gap: 14 }}>
    <Text style={{ fontWeight: 'bold', fontSize: 13.5, color: '#000' }}>Date</Text>
    <Text style={{ fontWeight: 'bold', fontSize: 13.5, color: '#000' }}>Project reference</Text>
    <Text style={{ fontWeight: 'bold', fontSize: 13.5, color: '#000' }}>Roof size</Text>
    <Text style={{ fontWeight: 'bold', fontSize: 13.5, color: '#000' }}>For the attention of</Text>
    <Text style={{ fontWeight: 'bold', fontSize: 13.5, color: '#000' }}>Prepared by</Text>
  </View>

  {/* Columna derecha: datos */}
  <View style={{ gap: 14 }}>
    <Text style={{ fontSize: 13.5, color: '#000' }}>{date || '_______'}</Text>
    <Text style={{ fontSize: 13.5, color: '#000' }}>{reference || '_______'}</Text>
    <Text style={{ fontSize: 13.5, color: '#000' }}>{roofSize || '_______'}</Text>
    <Text style={{ fontSize: 13.5, color: '#000' }}>{attention || '_______'}</Text>
    <View>
      <Text style={{ fontSize: 13.5, color: '#000' }}>Paul Jones</Text>
      <Text style={{ fontSize: 13.5, color: '#000' }}>Technical Manager</Text>
      <Text style={{ fontSize: 13.5, color: '#000' }}>T: 01948 841 877</Text>
      <Text style={{ fontSize: 13.5, color: '#0072ce' }}>
        E: paul.jones@lrs-systems.co.uk
      </Text>
    </View>
  </View>
</View>



 {/* Pie de página */}
 <PdfFooter guarantee={guarantee} />
</Page>


      {/* Página 4: Preliminaries and General Conditions (on 20 years) */}

      {guarantee === '20-year' && (
  <Page size="A4" style={styles.page}>
    <PdfHeader reference={reference} />

    {/* Título */}
    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>
      Preliminaries and General Conditions
    </Text>

    <Text style={{ fontSize: 12, marginBottom: 12 }}>
      <Text style={{ fontWeight: 'bold' }}>Planning Your Installation:</Text>{' '}
      It is recommended that you familiarise yourself with the installation procedure and any site-specific peculiarities. (See ‘Site Visit’ below).
    </Text>

    <Text style={{ fontSize: 12, marginBottom: 12 }}>
      All LRS PRO system specifications need to be undertaken by ‘LRS Approved’ operatives.
    </Text>

    <Text style={{ fontSize: 12, marginBottom: 12 }}>
      <Text style={{ fontWeight: 'bold' }}>Site Visit:</Text>{' '}
      It is recommended that the Contractor undertakes a site visit to ascertain access to the site and the working area. Consideration should be given to:
    </Text>

    <View style={{ marginLeft: 20, marginBottom: 16 }}>
      <Text style={{ fontSize: 12 }}>• The height of the roof.</Text>
      <Text style={{ fontSize: 12 }}>• The protection from falling and safeguarding the public from objects falling from the roof (e.g. double handrail and heras fencing).</Text>
      <Text style={{ fontSize: 12 }}>• Access for operatives and materials (to the site and the working area).</Text>
      <Text style={{ fontSize: 12 }}>• The provision of safe site storage / compound / welfare facilities.</Text>
      <Text style={{ fontSize: 12 }}>• The removal of debris and waste.</Text>
    </View>

    <Text style={{ fontSize: 12, marginBottom: 12 }}>
      All roofing materials are to be supplied by Liquid Roofing Systems Ltd (LRS), to be fit for purpose and of the type and quality herein. Any sub-standard materials will be rejected. No alternatives are to be substituted.
    </Text>

    <Text style={{ fontSize: 12, marginBottom: 12 }}>
      The contractor shall employ no-one, but LRS approved, competent tradesmen and the whole of the works shall be carried out and completed in accordance to the correct <Text style={{ fontWeight: 'bold' }}>RapidRoof Pro Specification</Text>.
    </Text>

    <Text style={{ fontSize: 12, marginBottom: 20 }}>
      <Text style={{ fontWeight: 'bold' }}>Waterproofing Only:</Text>{' '}
      This specification is based on a waterproofing-only overlay of an existing roof covering and does not include thermal insulation.
    </Text>

     {/* Pie de página */}
     <PdfFooter guarantee={guarantee} />
  </Page>
)}



{/* Página 4: Preliminaries and General Conditions (10 years only) */}
{guarantee === '10-year' && (
  <Page size="A4" style={styles.page}>
    <PdfHeader reference={reference} />

    {/* Título */}
    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>
      Preliminaries and General Conditions
    </Text>

    <Text style={{ fontSize: 12, marginBottom: 12 }}>
      <Text style={{ fontWeight: 'bold' }}>Planning Your Installation:</Text>{' '}
      It is recommended that you familiarise yourself with the installation procedure and any site-specific peculiarities. (See ‘Site Visit’ below).
    </Text>

    <Text style={{ fontSize: 12, marginBottom: 12 }}>
      <Text style={{ fontWeight: 'bold' }}>Site Visit:</Text>{' '}
      It is recommended that the Contractor undertakes a site visit to ascertain access to the site and the working area. Consideration should be given to:
    </Text>

    <View style={{ marginLeft: 20, marginBottom: 16 }}>
      <Text style={{ fontSize: 12 }}>• The height of the roof.</Text>
      <Text style={{ fontSize: 12 }}>• The protection from falling and safeguarding the public from objects falling from the roof (e.g. double handrail and heras fencing).</Text>
      <Text style={{ fontSize: 12 }}>• Access for operatives and materials (to the site and the working area).</Text>
      <Text style={{ fontSize: 12 }}>• The provision of safe site storage / compound / welfare facilities.</Text>
      <Text style={{ fontSize: 12 }}>• The removal of debris and waste.</Text>
    </View>

    <Text style={{ fontSize: 12, marginBottom: 12 }}>
      All roofing materials are to be supplied by Liquid Roofing Systems Ltd (LRS), to be fit for purpose and of the type and quality herein. Any sub-standard materials will be rejected. No alternatives are to be substituted.
    </Text>

    <Text style={{ fontSize: 12, marginBottom: 12 }}>
      The contractor shall employ no-one, but LRS approved, competent tradesman and the whole of the works shall be carried out and completed in accordance to the correct <Text style={{ fontWeight: 'bold' }}>RapidRoof Specification</Text>.
    </Text>

    <Text style={{ fontSize: 12, marginBottom: 20 }}>
      <Text style={{ fontWeight: 'bold' }}>Waterproofing Only:</Text>{' '}
      This specification is based on a waterproofing only overlay of an existing roof covering and does not include thermal insulation.
    </Text>

    <PdfFooter guarantee={guarantee} />
  </Page>
)}


{/* Página 5 */}

{(guarantee === '10-year' || guarantee === '20-year') && (
  <Page size="A4" style={styles.page}>
     <PdfHeader reference={reference} />

    {/* Contenido */}
    <View style={{ gap: 20 }}>
      <View>
        <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 4 }}>
          Measuring the Roof
        </Text>
        <Text style={{ fontSize: 12, lineHeight: 1.4 }}>
          It is important to accurately measure your roof to determine the amount of materials required
          (including a realistic amount for wastage – guide minimum 10% of the gross surface area).
        </Text>
        <Text style={{ fontSize: 12, lineHeight: 1.4, marginTop: 6 }}>
          The roof area should include all areas to be coated including upstands and perimeter details etc.
        </Text>
      </View>

      <View>
        <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 4 }}>
          Existing Falls
        </Text>
        <Text style={{ fontSize: 12, lineHeight: 1.4 }}>
          RapidRoof will follow the contours of the existing surface. Falls and any deviations will be
          replicated. As a result, some areas of standing water may occur. Please note the acumination of
          ice, frost or ponding water will not have an adverse effect on the RapidRoof membrane.
        </Text>
        <Text style={{ fontSize: 12, lineHeight: 1.4, marginTop: 6 }}>
          This applies to the life expectancy and / or the long-term performance of the system and will
          not affect the product guarantee in any way.
        </Text>
      </View>

      <View>
        <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 4 }}>
          Changes in Scope of Works
        </Text>
        <Text style={{ fontSize: 12, lineHeight: 1.4 }}>
          LRS must be informed immediately of any proposed requirements to change, and the approved
          contractor must not implement any changes until agreed by LRS.
        </Text>
        <Text style={{ fontSize: 12, lineHeight: 1.4, marginTop: 6 }}>
          LRS will not be responsible for any changes of which they are not aware of or have not authorised,
          nor will they accept any liability or associated cost due to system failure.
        </Text>
      </View>
    </View>

     {/* Pie de página */}
     <PdfFooter guarantee={guarantee} />
  </Page>
)}

{/* Página 6 */}
<Page size="A4" style={styles.page}>
<PdfHeader reference={reference} />


  {/* Contenido normal */}
  <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 12 }}>
    Existing Roof Condition
  </Text>

  <Text style={{ fontSize: 12, marginBottom: 12 }}>
    The existing roof build-up should be inspected for defects and made good where required.
  </Text>

  <Text style={{ fontSize: 12, marginBottom: 12 }}>
    Taking core samples of several random areas to obtain information of the sub-structure below the roof surface is highly recommended.
    This is the responsibility of the roofing contractor and could help prevent any unforeseen issues arising during or after application.
  </Text>

  <Text style={{ fontSize: 12, marginBottom: 12 }}>
    Any areas where the insulation or the underlying substrate has collapsed, is defective or decayed, should be cut out, repaired, and reinstated
    on a like-for-like basis to provide a good solid base for the new coating system.
  </Text>

  <Text style={{ fontSize: 12, marginBottom: 20 }}>
    No claims can be considered by Liquid Roofing Systems Ltd should there be any latent defects resulting from faulty decking or substrate.
  </Text>

  {/* Pie de página */}
  <PdfFooter guarantee={guarantee} />

</Page>



{/* Página 7 - Natural Growth */}

<Page size="A4" style={styles.page}>
<PdfHeader reference={reference} />

  {/* Título de sección */}
  <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000', marginBottom: 18 }}>
    Natural Growth/Vegetation
  </Text>

  {/* Lista */}
  <View style={{ gap: 8 }}>
    <Text style={{ fontSize: 12, color: '#000' }}>
      • Remove all existing vegetation by mechanical extraction.
    </Text>
    <Text style={{ fontSize: 12, color: '#000' }}>
      • LRS 799 Wash-N-Prep may be used to remove stubborn staining / growth. Consult separate data sheet for more further information.
    </Text>
    <Text style={{ fontSize: 12, color: '#000' }}>
      • Wash off any 799 Wash-N-Prep residues before applying any LRS waterproof coatings.
    </Text>
    <Text style={{ fontSize: 12, color: '#000' }}>
      • 1no. 799 Wash-N-Prep 1ltr bottle will clean approx. 148m² at a ratio of 16:1 with clean water.
    </Text>
    <Text style={{ fontSize: 12, color: '#000' }}>
      • 799 Wash N Prep can be added to either a pump sprayer or as an attachment on a power washer.
    </Text>
    <Text style={{ fontSize: 12, color: '#000' }}>
      • For general cleaning add 250ml of 799 Wash N Prep to 4ltrs of clean water.
    </Text>
    <Text style={{ fontSize: 12, color: '#000' }}>
      • For heavy duty cleaning add 500ml of 799 Wash N Prep to 4ltrs of clean water.
    </Text>
    <Text style={{ fontSize: 12, color: '#000' }}>
      • Once applied the 799 Wash N Prep should be left for a minimum of 15 minutes to allow the stubborn stains to loosen.
    </Text>
    <Text style={{ fontSize: 12, color: '#000' }}>
      • The roof should be power washed using clean water to remove any loosened material and residue.
    </Text>
  </View>

  <PdfFooter guarantee={guarantee} />
</Page>

{/* Página 8 - Adhesion Test */}

<Page size="A4" style={styles.page}>
<PdfHeader reference={reference} />

  {/* Adhesion Test */}
  <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000', marginBottom: 12 }}>
    Adhesion Test
  </Text>

  <Text style={{ fontSize: 13.5, fontWeight: 'bold', color: '#000', marginBottom: 6 }}>
    Test Areas
  </Text>

  <View style={{ gap: 8, marginBottom: 25 }}>
    <Text style={{ fontSize: 12, color: '#000' }}>
      Clean, remove all dust and contamination before performing test patches. Prime using LRS RapidRoof Primer at 0.3kg per m² and allow to dry.
    </Text>
    <Text style={{ fontSize: 12, color: '#000' }}>
      The contractor must document and record the identified test areas after applying RapidRoof Pro BaseCoat.
    </Text>
    <Text style={{ fontSize: 12, color: '#000' }}>
      RapidRoof BaseCoat applied at 1.25kg per m² and fully reinforced using 150gsm Reinforcement Matting.
    </Text>
    <Text style={{ fontSize: 12, color: '#000' }}>
      The BaseCoat must be allowed to fully cure for 24 hours prior to the addition test being undertaken.
    </Text>
    <Text style={{ fontSize: 12, color: '#000' }}>
      Should the adhesion test fail the contractor must inform LRS immediately upon their findings so that alternative measures can be agreed before the main works commence.
    </Text>
  </View>

  {/* Compliance Section */}
  <Text style={{ fontSize: 13.5, fontWeight: 'bold', color: '#000', marginBottom: 10 }}>
    Compliance with Building Regulations
  </Text>

  <Text style={{ fontSize: 12, color: '#000', marginBottom: 8 }}>
    You should ensure that the design of the roof to which RapidRoof is to be applied is in accordance with current regulations, codes and good practice. For further guidance consult with:
  </Text>

  <View style={{ gap: 6 }}>
    <Text style={{ fontSize: 12, color: '#000' }}>
      • BS6229 (Code of Practice for flat roofs with continuously supported coverings).
    </Text>
    <Text style={{ fontSize: 12, color: '#000' }}>
      • BS5250 (Control of Condensation in Buildings).
    </Text>
    <Text style={{ fontSize: 12, color: '#000' }}>
      • Local Authority Building Control regarding compliance with regulations or seek professional advice.
    </Text>
  </View>

  <PdfFooter guarantee={guarantee} />
</Page>

{/* Página 9 - Flat Roof Detailing */}

<Page size="A4" style={styles.page}>
<PdfHeader reference={reference} />

  {/* Flat Roof Detailing Guidance */}
  <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000', marginBottom: 10 }}>
    Flat Roof Detailing Guidance
  </Text>

  <View style={{ gap: 8, marginBottom: 24 }}>
    <Text style={{ fontSize: 12, color: '#000' }}>
      Any redundant roof details should be removed prior to the commencement of works. The roof area underneath made good as required, ensuring that it matches the build-up of the surrounding roof area.
    </Text>
    <Text style={{ fontSize: 12, color: '#000' }}>
      Termination details should have a minimum 150mm upstand height above the finished surface of the roof and should be terminated into a chase or have a suitable cover flashing or weathering flange. Any details that are unable to meet the 150mm should be terminated using a termination bar or LRS PU mastic.
    </Text>
    <Text style={{ fontSize: 12, color: '#000' }}>
      Any details where this cannot be achieved should be periodically inspected and {guarantee === '10-year' ? 'require annual maintenance.' : 'may require occasional maintenance.'}
    </Text>
    <Text style={{ fontSize: 12, color: '#000' }}>
      All detailing surfaces to be coated on are fully prepared and primed as per the main specification.
    </Text>
    <Text style={{ fontSize: 12, color: '#000' }}>
      The detailing should be dressed as far as possible into all outlets (minimum 150mm).
    </Text>
    <Text style={{ fontSize: 12, color: '#000' }}>
      Care should be taken to ensure all roof details comply with:
    </Text>
    <View style={{ gap: 4 }}>
      <Text style={{ fontSize: 12, color: '#000' }}>
        • BS 6229 Guidance (Flat Roofs with Continuously Supported Membranes)
      </Text>
      <Text style={{ fontSize: 12, color: '#000' }}>
        • Guide 7.1 (Flat Roofs and Balconies) of the NHBC Standards 2020
      </Text>
      <Text style={{ fontSize: 12, color: '#000' }}>
        • Liquid Roofing and Waterproofing Association Design Guide for Liquid Applied Waterproofing Systems for Roofs and Balconies, Issue 1, 2020
      </Text>
    </View>
  </View>

  {/* CDM Section */}
  <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000', marginBottom: 10 }}>
    CDM
  </Text>

  <View style={{ gap: 8 }}>
    <Text style={{ fontSize: 12, color: '#000' }}>
      CDM Regulations are applicable to all construction projects – commercial or domestic.
    </Text>
    <Text style={{ fontSize: 12, color: '#000' }}>
      The Contractor’s responsibilities include:
    </Text>
    <Text style={{ fontSize: 12, color: '#000' }}>
      • Ensuring that all employed/appointed workers have the skills, knowledge, training, and experience to carry out the works, or are in the process of obtaining them.
    </Text>
    <Text style={{ fontSize: 12, color: '#000' }}>
      • Providing appropriate supervision, information, and instructions to workers under their control.
    </Text>
    <Text style={{ fontSize: 12, color: '#000' }}>
      Operatives should take an active part in helping to manage health and safety risks. Responsibilities include:
    </Text>
    <Text style={{ fontSize: 12, color: '#000' }}>
      • Only carrying out construction work if they have the relevant skills, knowledge, training, and experience. Alternatively, operatives need to ensure that they are provided with the training and supervision that enables them to do their works safely and without risk to health.
    </Text>
  </View>

  <PdfFooter guarantee={guarantee} />
</Page>


{/* Página 10 - Roof Specification */}

{image && (
  <Page size="A4" style={styles.page}>
      <PdfHeader reference={reference} />

    {/* TÍTULO PRINCIPAL */}
    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000', marginBottom: 16 }}>
      Roof Specification
    </Text>

    {/* SUBTÍTULO CON REFERENCIA */}
    <Text style={{ fontSize: 12, color: '#000', marginBottom: 30 }}>
      Roof area covered in this specification: {reference || '________'}
    </Text>

    {/* IMAGEN DEL PROYECTO */}
    <Image src={image} style={{ width: '100%', height: 'auto', marginBottom: 30 }} />

    <PdfFooter guarantee={guarantee} />
  </Page>
)}


{/* pagina 11 */}

<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 14 }}>
    The Roof Build-Up
  </Text>

  <Text style={{ fontSize: 12, marginBottom: 20 }}>
    With the information and images provided this specification is for <Text style={{ fontWeight: 'bold' }}>{reference || '________'}</Text>, which is approx. <Text style={{ fontWeight: 'bold' }}>{roofSize || '________'}</Text> and is a <Text style={{ fontWeight: 'bold' }}>{roofType || '________'}</Text>.
  </Text>

  {/* Tabla tipo rows visuales */}
  <View style={{ borderTopWidth: 1, borderColor: '#ccc' }}>
    {/* Project Reference */}
    <View style={{ flexDirection: 'row', paddingVertical: 6 }}>
      <Text style={{ width: '40%', fontWeight: 'bold', fontSize: 12 }}>Project Reference</Text>
      <Text style={{ fontSize: 12 }}>{reference || '________'}</Text>
    </View>
    <View style={{ flexDirection: 'row', paddingVertical: 6 }}>
      <Text style={{ width: '40%', fontWeight: 'bold', fontSize: 12 }}>Roof Size</Text>
      <Text style={{ fontSize: 12 }}>{roofSize || '________'}</Text>
    </View>
    <View style={{ flexDirection: 'row', paddingVertical: 6 }}>
      <Text style={{ width: '40%', fontWeight: 'bold', fontSize: 12 }}>Roof Type</Text>
      <Text style={{ fontSize: 12 }}>{roofType || '________'}</Text>
    </View>

    {/* Build Up */}
    <View style={{ flexDirection: 'row', paddingVertical: 6 }}>
      <Text style={{ width: '40%', fontWeight: 'bold', fontSize: 12 }}>
        {roofType === 'Warm Roof' && 'Warm Roof Build Up'}
        {roofType === 'Inverted Roof' && 'Inverted Roof Build Up'}
      </Text>
      <View>
        {roofType === 'Warm Roof' && [
          'Existing Substrate',
          'Elotene VCL',
          'Insulation',
          'Elotene Foil Faced Carrier',
          'RapidRoof Pro Waterproof',
        ].map((item, i) => (
          <Text key={i} style={{ fontSize: 12 }}>{item}</Text>
        ))}

        {roofType === 'Inverted Roof' && [
          'Existing Substrate',
          'RapidRoof Pro Waterproof',
          'XPS Insulation',
          'WFRL',
          'Slabs / Ballast',
        ].map((item, i) => (
          <Text key={i} style={{ fontSize: 12 }}>{item}</Text>
        ))}

      </View>
    </View>

    {/* Campos adicionales */}
    {[
         ...(roofType === 'Warm Roof' ? [['U Value Needed', uValue]] : []),
      ['Outlets', outlets],
      ['Skylights', skylights],
      ['AC Units', acUnits],
      ['Existing Coatings', existingCoatings],
      ['Ponding Water', pondingWater],
    ].map(([label, value], i) => (
      <View key={i} style={{ flexDirection: 'row', paddingVertical: 6 }}>
        <Text style={{ width: '40%', fontWeight: 'bold', fontSize: 12 }}>{label}</Text>
        <Text style={{ fontSize: 12 }}>{value || '________'}</Text>
      </View>
    ))}
  </View>

  <PdfFooter guarantee={guarantee} />
</Page>




    </Document>
  );
};

export default PdfDocument;
