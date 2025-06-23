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
  pondingWater,
  antiSkid,
  photos,
  }) => {
    const guaranteeText = getGuaranteeText(guarantee);
    const surfaceText = surfaceTexts[surface] || '';

    const fullyPrimedSurfaces = [
        'Asbestos', 'Concrete', 'Existing Coatings', 'Single-Ply', 'VCL'
      ];
      
      const isFullyPrimed = fullyPrimedSurfaces.includes(surface);

  
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


 
{/*Pagina 4 */}

<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>
    Preliminaries and General Conditions
  </Text>

  <Text style={{ fontSize: 12, marginBottom: 12 }}>
    <Text style={{ fontWeight: 'bold' }}>Planning Your Installation:</Text>{' '}
    It is recommended that you familiarise yourself with the installation procedure and any site-specific peculiarities. (See ‘Site Visit’ below).
  </Text>

  {guarantee === '20-year' && (
    <Text style={{ fontSize: 12, marginBottom: 12 }}>
      All LRS PRO system specifications need to be undertaken by ‘LRS Approved’ operatives.
    </Text>
  )}

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
    The contractor shall employ no-one, but LRS approved, competent tradesmen and the whole of the works shall be carried out and completed in accordance to the correct <Text style={{ fontWeight: 'bold' }}>{guarantee === '20-year' ? 'RapidRoof Pro Specification' : 'RapidRoof Specification'}</Text>.
  </Text>

  <Text style={{ fontSize: 12, marginBottom: 20 }}>
    <Text style={{ fontWeight: 'bold' }}>Waterproofing Only:</Text>{' '}
    This specification is based on a waterproofing-only overlay of an existing roof covering and does not include thermal insulation.
  </Text>

  <PdfFooter guarantee={guarantee} />
</Page>


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

{/* Página 12 - Preparation */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000', marginBottom: 16 }}>
    Preparation
  </Text>

  <View style={{ gap: 12 }}>
    {[
      "The contractor is to carry out their own inspection to satisfy themselves with regards to the extent of the works involved in the preparation of the existing roof coverings and substrate.",
      "No claims arising from failure to do so will be considered by LRS.",
      "Once the roof has been sufficiently prepared, the whole roof area requiring waterproofing should remain clean. Sweep away any dust etc between coats.",
      "The surface must be dry before and during application.",
      "Any blisters will need to be checked before over coating with RapidRoof.",
      "Blisters within the surface normally indicates moisture under the surface.",
      "Any moisture present will need to be dried out before applying any RapidRoof.",
      "All mechanical damage will need to be made good where necessary.",
      "FastCoat Pro PU Joint Sealer should be used in replacement where existing mastic exists."
    ].map((line, idx) => (
      <Text key={idx} style={{ fontSize: 12, color: '#000' }}>{line}</Text>
    ))}
  </View>

  <PdfFooter guarantee={guarantee} />
</Page>

{/* Página 13 - Cleaning (Parte 1) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 16 }}>
    Cleaning
  </Text>

  <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 8 }}>
    Guide to Cleaning a Roof for {guarantee === '20-year' ? 'RapidRoof Pro Waterproof' : 'RapidRoof Waterproof'} Application
  </Text>

  <Text style={{ fontSize: 12, marginBottom: 14 }}>
    Objective: Ensure the roof surface is properly prepared for the application of {guarantee === '20-year' ? 'RapidRoof Pro Waterproof' : 'RapidRoof Waterproof'} to achieve optimal adhesion and performance.
  </Text>

  <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 6 }}>Materials Needed:</Text>
  {[
    "Safety equipment (gloves, goggles, non-slip shoes)",
    "Broom or leaf blower",
    "Scraper or putty knife",
    "2000psi Pressure washer",
    "799 Wash N Prep",
    "Stiff-bristle brush",
    "Clean water",
    "Bucket",
    "Ladder or scaffolding (if necessary)",
    "Tarpaulin (to protect landscaping)",
    "Rapid Pro Detailer (for minor repairs)"
  ].map((item, i) => (
    <Text key={i} style={{ fontSize: 12 }}>• {item}</Text>
  ))}

  <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 14, marginBottom: 6 }}>Safety Precautions:</Text>
  {[
    "Weather Check - ensure weather conditions are dry. Avoid cleaning on windy or rainy days.",
    "Safety Gear - wear appropriate safety gear including gloves, goggles, and non-slip shoes.",
    "Fall Protection - use a harness or secure ladder and scaffolding if working on a steep or high roof.",
    "Electrical Hazards - be aware of overhead power lines."
  ].map((item, i) => (
    <Text key={i} style={{ fontSize: 12 }}>• {item}</Text>
  ))}

  <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 14, marginBottom: 6 }}>Cleaning Steps:</Text>
  {[
    "Clear Debris - use a broom or leaf blower to remove loose debris such as leaves, twigs, and dirt. Check for and remove any nesting materials or other obstructions.",
    "Scrape Off Moss and Lichen - use a scraper or putty knife to gently remove moss, lichen, or any stubborn debris. Be careful not to damage the " + (guarantee === '20-year' ? "roofing material." : "existing roofing substrate."),
    "Pressure Washing - use a 2000psi pressure washer to thoroughly wash the roof. Start from the top and work your way down. Maintain a safe distance to avoid damaging the roofing material with excessive pressure.",
    "Apply Cleaning Solution - mix 799 Wash N Prep roof cleaner with water according to the product instructions. Apply the cleaning solution to the roof using a stiff-bristle brush. Scrub gently to remove grime, algae, and mildew. Mixing Ratio is 1 part 799 and 16 parts water.",
  ].map((item, i) => (
    <Text key={i} style={{ fontSize: 12 }}>{`• ${item}`}</Text>
  ))}

  <PdfFooter guarantee={guarantee} />
</Page>

{/* Página 14 - Cleaning (Parte 2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  {[
    "For stubborn stains or mould, mix 1 part 799 and 8 parts water and apply it to the affected areas. Let it sit for 15–20 minutes before rinsing.",
    "Rinse Thoroughly - rinse the roof thoroughly with clean water to remove all soap and cleaning solution residues. Ensure no cleaner is left behind as it can affect the adhesion of " + (guarantee === '20-year' ? "RapidRoof Pro Waterproof." : "RapidRoof Waterproof."),
    "Inspect and Repair - inspect the roof for any damage, such as cracks, loose shingles, or holes. Repair minor issues with RapidRoof Pro Detailer. Ensure the roof surface is smooth and intact.",
    "Drying - allow the roof to dry completely before applying RapidRoof Primer. This may take several hours to a full day, depending on weather conditions.",
  ].map((item, i) => (
    <Text key={i} style={{ fontSize: 12 }}>{`• ${item}`}</Text>
  ))}

  <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 14, marginBottom: 6 }}>Final Steps:</Text>
  {[
    "Protection - cover any landscaping or structures near the roof with tarpaulin to protect them from cleaning runoff.",
    "Documentation - take photos before and after cleaning to document the condition of the roof."
  ].map((item, i) => (
    <Text key={i} style={{ fontSize: 12 }}>{`• ${item}`}</Text>
  ))}

  {/* TV Aerials */}
  <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 14, marginBottom: 6 }}>
    TV Aerials and Satellite Dish Arrays
  </Text>
  <Text style={{ fontSize: 12, marginBottom: 8 }}>
    Any TV aerials or satellite arrays that will impede the roofing works will need to be temporarily removed or raised to facilitate the works.
  </Text>
  <Text style={{ fontSize: 12, marginBottom: 8 }}>
    The contractor must liaise with the client directly in relation to how to best serve the property so that minimal disturbance of service is achieved throughout the roof works.
  </Text>

  {/* Cables */}
  <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10, marginBottom: 6 }}>
    Cables
  </Text>
  <Text style={{ fontSize: 12 }}>
    If a cable tray is not currently in situ, consideration should be made to keep the cables from direct contact with the membrane.
  </Text>

  <PdfFooter guarantee={guarantee} />
</Page>

{/* Página 15 - Outlets (Parte 1) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 16 }}>Outlets</Text>

  <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 8 }}>
    Guide to Applying {guarantee === '20-year' ? 'RapidRoof Pro' : 'RapidRoof'} into Roof Rainwater Outlets (RWO)
  </Text>

  <Text style={{ fontSize: 12, marginBottom: 14 }}>
    Objective: Properly apply {guarantee === '20-year' ? 'RapidRoof Pro' : 'RapidRoof'} into Rainwater Outlets, ensuring the waterproofing extends as far into the outlet as possible to create a durable, watertight seal.
  </Text>

  <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 6 }}>Materials Needed:</Text>
  {[
    "PPE",
    `${guarantee === '20-year' ? 'RapidRoof Pro' : 'RapidRoof'} products`,
    "Mixing stick or drill with a mixing attachment",
    `Application tools – short-piled roller, ${guarantee === '20-year' ? 'paint brush' : 'disposable paint brush'}`,
    `RapidRoof Pro Detailer - when required for difficult details and ${guarantee === '20-year' ? 'snagging' : 'smoothing outlet ridges'}.`
  ].map((item, idx) => (
    <Text key={idx} style={{ fontSize: 12 }}>• {item}</Text>
  ))}

  <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 14, marginBottom: 6 }}>Safety Precautions:</Text>
  {[
    "Weather Check - ensure weather conditions are dry and the temperature is within the manufacturer's recommended range. Avoid working when rainfall is imminent.",
    "PPE - wear appropriate PPE specific to the requirements of the RapidRoof system and project/site.",
    "Working at height – ensure the correct access and safety systems have been installed / are in situ when working at height.",
    "Electrical Hazards - be aware of overhead power lines and ensure all power tools are used safely."
  ].map((item, idx) => (
    <Text key={idx} style={{ fontSize: 12 }}>• {item}</Text>
  ))}

  <PdfFooter guarantee={guarantee} />
</Page>

{/* Página 16 - Outlets (Parte 2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 6 }}>Preparation Steps:</Text>
  {[
    "Remove Outlet Grates - carefully remove all outlet grates to allow access to the interior of the outlets.",
    "Ensure the roof surface and outlets are clean, dry, and free from debris, dust, natural build-up and any other loose material. Use a brush or cloth to clean and dry inside the outlet.",
    `Inspect the outlet for any cracks, splits, or damages that need repair. Use RapidRoof Pro Detailer to repair minor damages. Allow all stages of application to cure for 1 hour before commencing with the next stage.`
  ].map((item, idx) => (
    <Text key={idx} style={{ fontSize: 12 }}>• {item}</Text>
  ))}

  <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 14, marginBottom: 6 }}>Application Steps:</Text>
  <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 4 }}>Apply Primer:</Text>
  {[
    `Mix ${guarantee === '20-year' ? 'RapidRoof Pro' : 'RapidRoof'} Primer with Catalyst according to LRS guidelines.`,
    "Apply to all areas requiring waterproofing at a coverage rate of 0.3kg/m² using a brush.",
    guarantee === '20-year'
      ? "Reinforce cracks, joints and changes of angle with Reinforcement Matting embedded while the primer is still wet."
      : null
  ].filter(Boolean).map((item, idx) => (
    <Text key={idx} style={{ fontSize: 12 }}>• {item}</Text>
  ))}

  <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10, marginBottom: 4 }}>Apply BaseCoat:</Text>
  {[
    `Mix ${guarantee === '20-year' ? 'RapidRoof Pro' : 'RapidRoof'} BaseCoat with Catalyst according to LRS guidelines.`,
    `Apply using short-pile roller or brush at a coverage rate of ${guarantee === '20-year' ? '1.25kg/m²' : '1kg/m²'}, extend the coverage into the outlet as far as possible.`,
    guarantee === '20-year'
      ? "Immediately embed Reinforcement Matting into BaseCoat. Ensure it is completely saturated and free from creases, standing wicks and pinholes."
      : null
  ].filter(Boolean).map((item, idx) => (
    <Text key={idx} style={{ fontSize: 12 }}>• {item}</Text>
  ))}

  <PdfFooter guarantee={guarantee} />
</Page>

{/* Página 17 - Outlets (Parte 3) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 4 }}>Apply TopCoat:</Text>
  {[
    `Mix ${guarantee === '20-year' ? 'RapidRoof Pro' : 'RapidRoof'} TopCoat with Catalyst according to LRS guidelines.`,
    `Apply at a coverage rate of ${guarantee === '20-year' ? '0.75kg/m²' : '0.5kg/m²'} by short-pile roller or brush.`,
    guarantee === '20-year'
      ? "If snagging is required, fill pinholes with RapidRoof Pro Detailer and sand wicks with 80-grit sandpaper before applying TopCoat."
      : null
  ].filter(Boolean).map((item, idx) => (
    <Text key={idx} style={{ fontSize: 12 }}>• {item}</Text>
  ))}

  <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 14, marginBottom: 4 }}>Final Steps:</Text>
  {[
    "Inspect the applied coatings for any defects such as wicks, creases, fish mouths or pinholes.",
    "Once the TopCoat has fully cured, reinstall the outlet grates carefully.",
    "Clean all tools and equipment immediately after use. Dispose of any waste materials following local regulations – used roller heads and brushes should be disposed of.",
    "Take photos before, during, and after the application to document the staged condition of the roof."
  ].map((item, idx) => (
    <Text key={idx} style={{ fontSize: 12 }}>• {item}</Text>
  ))}

  <PdfFooter guarantee={guarantee} />
</Page>


{/* Página 18  Ponding Water  1/3 */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 16 }}>
    Ponding Water / Filling Cracks and Joints
  </Text>

  <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 8 }}>
    Guide to Using Multi-Purpose Filler for Roofing
  </Text>

  <Text style={{ fontSize: 12, marginBottom: 14 }}>
    Objective: Properly use the Multi-Purpose Filler (resin and aggregate) to fill ponding areas on a roof, ensuring a level surface that promotes proper drainage and prevents water accumulation. Also used for filled large cracks or splits within the existing surface.
  </Text>

  <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 6 }}>Materials Needed:</Text>
  {[
    "Safety equipment (gloves, goggles, non-slip shoes)",
    `${guarantee === '10-year' ? "Multi-Purpose Filler Kit" : "Ponding Filler Kit"} components (Resin and Aggregate)`,
    "Mixing stick or drill with a mixing attachment",
    "Scale (for accurate measurement)",
    "Clean mixing container",
    "Application tools (trowel)",
    "Cleaning tools (brush, cloth)",
    "Measuring tools (tape measure, level)",
    "Ladder or scaffolding (if necessary)",
    "Tarpaulin (to protect landscaping and nearby structures)",
    "Masking tape (for neat edges)",
    "RapidRoof Pro Detailer (if required for minor repairs)"
  ].map((item, i) => (
    <Text key={i} style={{ fontSize: 12 }}>• {item}</Text>
  ))}

  <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 14, marginBottom: 6 }}>Safety Precautions:</Text>
  {[
    "Wear Safety Gear: Wear appropriate safety gear including gloves, goggles, and non-slip shoes to protect against splashes and fumes.",
    "Ventilation: Ensure good ventilation when mixing and applying the product.",
    "Handling Chemicals: Handle all components with care as they can be hazardous. Follow the LRS safety guidelines."
  ].map((item, i) => (
    <Text key={i} style={{ fontSize: 12 }}>• {item}</Text>
  ))}

  <PdfFooter guarantee={guarantee} />
</Page>

{/* Página 19  Ponding Water  2/3*/}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 6 }}>Preparation Steps:</Text>
  {[
    "Identify Ponding Areas, Cracks or Splits:",
    "  o Locate all areas on the roof where water ponds or has cracks and splits. Measure the size and depth of these areas to determine the amount of Multi-Purpose Filler needed.",
    "Clean the Roof:",
    "  o Ensure the roof surface is clean, dry, and free from debris, dust, and any loose material.",
    "Inspect for Damage:",
    "  o Inspect the areas for any underlying damage. Repair any minor cracks or splits using RapidRoof Pro Detailer. Allow repairs to cure fully."
  ].map((item, i) => (
    <Text key={i} style={{ fontSize: 12 }}>{item}</Text>
  ))}

  <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 12, marginBottom: 6 }}>Mixing Steps:</Text>
  {guarantee === '10-year' && (
    <Text style={{ fontSize: 12 }}>
      • RapidRoof Primer should be applied before the application of the Multi-Purpose Filler, this should be applied at 0.3kg per m².
    </Text>
  )}
  {[
    "Prepare the Components:",
    "  o Resin: The binding component.",
    "  o Aggregate: The filler material.",
    "Determine the Mixing Ratio:",
    "  o Follow LRS instructions for the correct ratio of resin to aggregate. Typically, the ratio is provided by weight or volume.",
    "Measure and Mix:",
    "  o Resin: Measure the required amount of resin and pour it into a clean mixing container.",
    "  o Aggregate: Measure the required amount of aggregate. Catalyst is premixed with the aggregate.",
    "  o Mix Thoroughly: Gradually add the aggregate to the resin while continuously mixing. Use a mixing stick or drill with a mixing attachment to blend the components until the mixture is uniform and has a consistent texture."
  ].map((item, i) => (
    <Text key={i} style={{ fontSize: 12 }}>{item}</Text>
  ))}

  <PdfFooter guarantee={guarantee} />
</Page>

{/* Página 20  Ponding Water  3/3 */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 6 }}>Application Steps:</Text>
  {[
    "Apply the Multi-Purpose Filler:",
    "  o Use a trowel to apply the mixed Multi-Purpose Filler to the ponding areas cracks or splits. RapidRoof Primer should be applied before the application of the Multi-Purpose Filler.",
    "  o Ensure the filler is pressed firmly into the area, filling it completely and removing any air pockets.",
    "Level the Surface:",
    "  o Use a level to ensure the filled area is even with the surrounding roof surface. Smooth the surface of the filled area to match the roof profile. Remove any excess filler and ensure a neat finish.",
    "Allow to Dry:",
    "  o Allow the Multi-Purpose Filler to dry, this is typically 20 minutes. The drying time may vary based on environmental conditions and the specific product used."
  ].map((item, i) => (
    <Text key={i} style={{ fontSize: 12 }}>{item}</Text>
  ))}

  <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 14, marginBottom: 6 }}>Final Inspection and Protection:</Text>
  {[
    "Inspect the Filled Area:",
    "  o Check the filled area for any signs of shrinkage, cracking, or other imperfections. If necessary, apply additional filler and smooth again.",
    "Clean Up:",
    "  o Clean all tools and equipment immediately after use.",
    "Document the Repair:",
    "  o Take photos before, during, and after the application to document the condition of the roof and the work completed."
  ].map((item, i) => (
    <Text key={i} style={{ fontSize: 12 }}>{item}</Text>
  ))}

  <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 14, marginBottom: 6 }}>Maintenance:</Text>
  {[
    "Regular Inspection: Regularly inspect the roof to ensure that no new ponding areas, cracks or splits have developed and that the filled areas remain intact.",
    "Proper Drainage: Ensure that roof drains, gutters, and downspouts are clear and functioning properly to prevent water accumulation."
  ].map((item, i) => (
    <Text key={i} style={{ fontSize: 12 }}>• {item}</Text>
  ))}

  <Text style={{ fontSize: 12, marginTop: 14 }}>
    By following these steps, you ensure that ponding areas, cracks and splits on the roof are properly filled using a Multi-Purpose Filler, resulting in a level surface that promotes proper drainage and prevents water accumulation. This helps maintain the integrity of the roofing system and prolongs its lifespan.
  </Text>

  <PdfFooter guarantee={guarantee} />
</Page>


{/* Página 21 - Waterproof Coverings */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 16 }}>
    Waterproof Coverings
  </Text>

  <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 6 }}>
    20 minutes curing time
  </Text>

  <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 6 }}>
    Timing Considerations:
  </Text>

  <Text style={{ fontSize: 12 }}>• 20-Minute Cure Time:</Text>
  <Text style={{ fontSize: 12, marginLeft: 12 }}>
    o Work Quickly: Due to the 20-minute cure time, work in small, manageable sections. Mix only the amount of product that can be applied within this timeframe.
  </Text>
  <Text style={{ fontSize: 12, marginLeft: 12 }}>
    o Monitor Conditions: Monitor the weather conditions and temperature closely. Higher temperatures can accelerate the curing process, reducing the working time.
  </Text>

  <Text style={{ fontSize: 12, marginTop: 8 }}>• Curing Process:</Text>
  <Text style={{ fontSize: 12, marginLeft: 12 }}>
    o Inspect Application: Immediately after application, inspect for any bubbles, wrinkles, or uncoated areas and smooth out as necessary.
  </Text>
  <Text style={{ fontSize: 12, marginLeft: 12 }}>
    o Allow to Cure: Within 20 minutes, the {guarantee === '20-year' ? 'RapidRoof Pro' : 'RapidRoof'} will begin to cure. Ensure no traffic or disturbance occurs during this time.
  </Text>

  <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 12, marginBottom: 6 }}>
    Final Inspection and Protection:
  </Text>

  <Text style={{ fontSize: 12 }}>• Inspect and Smooth:</Text>
  <Text style={{ fontSize: 12, marginLeft: 12 }}>
    o Inspect the applied coatings for any imperfections. Smooth out any areas{guarantee === '20-year' ? '' : ','} if necessary, before the product fully cures.
  </Text>

  <Text style={{ fontSize: 12, marginTop: 6 }}>• Allow to Cure Completely:</Text>
  <Text style={{ fontSize: 12, marginLeft: 12 }}>
    o Allow all applied {guarantee === '20-year' ? 'RapidRoof Pro' : 'RapidRoof'} products to cure completely for overcoating, recommended leaving 1 hour. Full cure time may vary based on environmental conditions.
  </Text>

  <Text style={{ fontSize: 12, marginTop: 6 }}>• Protection:</Text>
  <Text style={{ fontSize: 12, marginLeft: 12 }}>
    o Cover any landscaping or structures near the roof with tarpaulin to protect them during the application process.
  </Text>

  <Text style={{ fontSize: 12, marginTop: 6 }}>• Documentation:</Text>
  <Text style={{ fontSize: 12, marginLeft: 12 }}>
    o Take photos before, during, and after the application to document the condition of the roof and the work completed.
  </Text>

  <Text style={{ fontSize: 12, marginTop: 12 }}>
    By following these steps and considering the 20-minute cure time of {guarantee === '20-year' ? 'RapidRoof Pro' : 'RapidRoof'}, you ensure that the application is properly executed, creating a durable and waterproof surface that will protect the roof for years to come.
  </Text>

  <PdfFooter guarantee={guarantee} />
</Page>


{/* Página 22 - Catalyst Ratio (Parte 1) */}
{(guarantee === '10-year' || guarantee === '20-year') && (
  <Page size="A4" style={styles.page}>
    <PdfHeader reference={reference} />

    <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 16 }}>
      Catalyst Ratio
    </Text>

    <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 8 }}>
      Guide to Adjusting Catalyst Ratio for {guarantee === '20-year' ? 'RapidRoof Pro' : 'RapidRoof'}
    </Text>

    <Text style={{ fontSize: 12, marginBottom: 10 }}>
      Objective: Properly mix {guarantee === '20-year' ? 'RapidRoof Pro' : 'RapidRoof'} with the correct catalyst ratio to ensure optimal curing times and performance.
    </Text>

    <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 6 }}>Materials Needed:</Text>
    <Text style={{ fontSize: 12 }}>• Safety equipment (gloves, goggles, non-slip shoes)</Text>
    <Text style={{ fontSize: 12 }}>
      • {guarantee === '20-year'
        ? 'RapidRoof Pro product (Primer, BaseCoat, TopCoat, Pro Detailer)'
        : 'RapidRoof product (Primer, BaseCoat, TopCoat, Pro Detailer and Anti-Skid)'}
    </Text>
    <Text style={{ fontSize: 12 }}>• Catalyst</Text>
    <Text style={{ fontSize: 12 }}>• Mixing stick or drill with a mixing attachment</Text>
    <Text style={{ fontSize: 12 }}>• Scale (for accurate measurement)</Text>
    <Text style={{ fontSize: 12 }}>• Clean mixing container</Text>
    <Text style={{ fontSize: 12 }}>• Measuring tools (for catalyst and product)</Text>
    <Text style={{ fontSize: 12 }}>• Application tools (roller or brush)</Text>

    <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 12, marginBottom: 6 }}>Safety Precautions:</Text>
    <Text style={{ fontSize: 12 }}>• Wear Safety Gear: Wear appropriate safety gear including gloves, goggles, and non-slip shoes to protect against splashes and fumes.</Text>
    <Text style={{ fontSize: 12 }}>• Ventilation: Ensure good ventilation when mixing and applying the product.</Text>
    <Text style={{ fontSize: 12 }}>• Handling Chemicals: Handle the catalyst with care as it can be hazardous. Follow the MSDS safety guidelines.</Text>

    <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 12, marginBottom: 6 }}>Catalyst Ratio:</Text>
    <Text style={{ fontSize: 12 }}>• Standard Ratio: 20g of catalyst to every 1kg of product (2% catalyst ratio)</Text>
    <Text style={{ fontSize: 12 }}>• Adjustable Range: 1% to 4% catalyst ratio, depending on temperature and desired curing time.</Text>

    <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 12, marginBottom: 6 }}>Calculating Catalyst Amounts:</Text>
    <Text style={{ fontSize: 12 }}>• Determine the Product Amount:</Text>
    <Text style={{ fontSize: 12, marginLeft: 12 }}>o Measure the amount of {guarantee === '20-year' ? 'RapidRoof Pro' : 'RapidRoof'} product you need to mix.</Text>
    <Text style={{ fontSize: 12 }}>• Calculate Catalyst Based on Desired Ratio:</Text>
    <Text style={{ fontSize: 12, marginLeft: 12 }}>o 1% Catalyst Ratio: 10g of catalyst per 1kg of product</Text>
    <Text style={{ fontSize: 12, marginLeft: 12 }}>o 2% Catalyst Ratio: 20g of catalyst per 1kg of product</Text>
    <Text style={{ fontSize: 12, marginLeft: 12 }}>o 3% Catalyst Ratio: 30g of catalyst per 1kg of product</Text>
    <Text style={{ fontSize: 12, marginLeft: 12 }}>o 4% Catalyst Ratio: 40g of catalyst per 1kg of product</Text>

    <PdfFooter guarantee={guarantee} />
  </Page>
)}


{/* Página 23 - Catalyst Ratio (Parte 2) */}
{(guarantee === '10-year' || guarantee === '20-year') && (
  <Page size="A4" style={styles.page}>
    <PdfHeader reference={reference} />

    <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 6 }}>Example Calculations:</Text>
    <Text style={{ fontSize: 12 }}>• For 1kg of Product:</Text>
    <Text style={{ fontSize: 12, marginLeft: 12 }}>o 1% Ratio: 10g catalyst</Text>
    <Text style={{ fontSize: 12, marginLeft: 12 }}>o 2% Ratio: 20g catalyst</Text>
    <Text style={{ fontSize: 12, marginLeft: 12 }}>o 3% Ratio: 30g catalyst</Text>
    <Text style={{ fontSize: 12, marginLeft: 12 }}>o 4% Ratio: 40g catalyst</Text>

    <Text style={{ fontSize: 12, marginTop: 6 }}>• For 5kg of Product:</Text>
    <Text style={{ fontSize: 12, marginLeft: 12 }}>o 1% Ratio: 50g catalyst</Text>
    <Text style={{ fontSize: 12, marginLeft: 12 }}>o 2% Ratio: 100g catalyst</Text>
    <Text style={{ fontSize: 12, marginLeft: 12 }}>o 3% Ratio: 150g catalyst</Text>
    <Text style={{ fontSize: 12, marginLeft: 12 }}>o 4% Ratio: 200g catalyst</Text>

    <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10, marginBottom: 6 }}>Mixing Steps:</Text>
    <Text style={{ fontSize: 12 }}>• Measure the Product:</Text>
    <Text style={{ fontSize: 12, marginLeft: 12 }}>o Weigh the required amount of {guarantee === '20-year' ? 'RapidRoof Pro' : 'RapidRoof'} product using a scale.</Text>
    <Text style={{ fontSize: 12 }}>• Measure the Catalyst:</Text>
    <Text style={{ fontSize: 12, marginLeft: 12 }}>o Weigh the appropriate amount of catalyst based on the chosen ratio.</Text>
    <Text style={{ fontSize: 12 }}>• Mix the Product and Catalyst:</Text>
    <Text style={{ fontSize: 12, marginLeft: 12 }}>o Pour the {guarantee === '20-year' ? 'RapidRoof Pro' : 'RapidRoof'} product into a clean mixing container.</Text>
    <Text style={{ fontSize: 12, marginLeft: 12 }}>o Add the catalyst to the product.</Text>
    <Text style={{ fontSize: 12, marginLeft: 12 }}>o Thoroughly mix using a mixing stick or a drill with attachment until uniform.</Text>

    <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10, marginBottom: 6 }}>Application:</Text>
    <Text style={{ fontSize: 12 }}>• Apply the mixed product promptly as curing begins once catalyst is added.</Text>
    <Text style={{ fontSize: 12 }}>• Work in manageable sections to avoid the product curing before application is complete.</Text>

    <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10, marginBottom: 6 }}>Notes on Environmental Conditions:</Text>
    <Text style={{ fontSize: 12 }}>• Higher Temperatures: Use a lower catalyst ratio to slow curing.</Text>
    <Text style={{ fontSize: 12 }}>• Lower Temperatures: Use a higher catalyst ratio to speed up curing.</Text>

    <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10, marginBottom: 6 }}>Final Inspection and Documentation:</Text>
    <Text style={{ fontSize: 12 }}>• Inspect the Mixture:</Text>
    <Text style={{ fontSize: 12, marginLeft: 12 }}>o Ensure no unmixed catalyst or product remains.</Text>
    <Text style={{ fontSize: 12 }}>• Apply and Allow to Cure:</Text>
    <Text style={{ fontSize: 12, marginLeft: 12 }}>o Follow application steps and allow full curing.</Text>
    <Text style={{ fontSize: 12 }}>• Document the Process:</Text>
    <Text style={{ fontSize: 12, marginLeft: 12 }}>o Take photos before, during and after application.</Text>

    <Text style={{ fontSize: 12, marginTop: 12 }}>
      By adjusting the catalyst ratio within the 1–4% range, you can control the curing time of {guarantee === '20-year' ? 'RapidRoof Pro' : 'RapidRoof'} to suit the environmental conditions and your application needs.
    </Text>

    <PdfFooter guarantee={guarantee} />
  </Page>
)}

{/* Página 24 - Existing Details, Terminations and Upstands (Parte 1) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  {/* TÍTULO PRINCIPAL */}
  <Text style={styles.sectionTitle}>
    Existing Details, Terminations and Upstands
  </Text>
  <Text style={[styles.text, { marginBottom: 20 }]}>
    Guide to Treating Existing Details, Terminations, and Upstands on a Roof at a 150mm Minimum Height
  </Text>

  {/* OBJECTIVE */}
  <Text style={[styles.label, { marginBottom: 6 }]}>Objective:</Text>
  <Text style={[styles.text, { marginBottom: 20 }]}>
    Ensure all existing details, terminations, and upstands on the roof are properly treated
    {guarantee === '20-year' || fullyPrimedSurfaces.includes(surface)
      ? ', primed and waterproofed'
      : ' and waterproofed'} to a minimum height of 150mm using RapidRoof products.
  </Text>

  {/* DEFINITIONS */}
  <Text style={[styles.label, { marginBottom: 6 }]}>Definitions:</Text>
  <Text style={styles.listItem}>• <Text style={styles.label}>Details:</Text> Specific areas on a roof where different materials or surfaces meet, such as around vents, skylights, and chimneys.</Text>
  <Text style={styles.listItem}>• <Text style={styles.label}>Terminations:</Text> Points where roofing materials end or transition, such as edges, eaves, and parapet walls.</Text>
  <Text style={[styles.listItem, { marginBottom: 20 }]}>• <Text style={styles.label}>Upstands:</Text> Vertical or inclined surfaces that rise from the main roof surface, such as walls, curbs, and penetrations.</Text>

  {/* MATERIALS NEEDED */}
  <Text style={[styles.label, { marginBottom: 6 }]}>Materials Needed:</Text>
  <Text style={styles.listItem}>• Safety equipment (gloves, goggles, non-slip shoes)</Text>
  <Text style={styles.listItem}>• RapidRoof products (Primer, BaseCoat, TopCoat, Detailer)</Text>
  <Text style={styles.listItem}>• Mixing stick or drill with a mixing attachment</Text>
  <Text style={styles.listItem}>• Measuring tools (scale for measuring product, tape measure for area calculation)</Text>
  <Text style={styles.listItem}>• Application tools (Short pile roller or brush)</Text>
  {(guarantee === '20-year' || fullyPrimedSurfaces.includes(surface)) && (
    <Text style={styles.listItem}>• Joint Tape</Text>
  )}
  <Text style={styles.listItem}>• RapidRoof Pro Detailer (for minor repairs)</Text>
  <Text style={styles.listItem}>• Scraper or putty knife</Text>
  <Text style={styles.listItem}>• Clean cloth or brush</Text>
  <Text style={styles.listItem}>• Ladder or scaffolding (if necessary)</Text>
  <Text style={styles.listItem}>• Tarpaulin (to protect landscaping and nearby structures)</Text>
  <Text style={styles.listItem}>• Masking tape (for neat edges)</Text>
  <Text style={[styles.listItem, { marginBottom: 20 }]}>• Scissors or utility knife</Text>

  {/* SAFETY PRECAUTIONS */}
  <Text style={[styles.label, { marginBottom: 6 }]}>Safety Precautions:</Text>
  <Text style={styles.listItem}>• Weather Check: Ensure weather conditions are dry and the temperature is between 0°c to 35°c recommended range. Avoid working on windy or rainy days.</Text>


  <PdfFooter guarantee={guarantee} />
</Page>


{/* Página 25 - Parte 2 */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  {/* CONTINUACIÓN SAFETY PRECAUTIONS */}
  <Text  style={styles.listItem}>• Safety Gear: Wear appropriate safety gear including gloves, goggles, and non-slip shoes.</Text>
  <Text style={styles.listItem}>• Fall Protection: Use a harness or secure ladder and scaffolding if working on a steep or high roof.</Text>
  <Text style={styles.listItem}>• Electrical Hazards: Be aware of overhead power lines.</Text>

  {/* PREPARATION STEPS */}
  <Text style={[styles.label, { marginBottom: 10 }]}>Preparation Steps:</Text>

  <Text style={[styles.listItem, { marginBottom: 2 }]}>• <Text style={styles.label}>Clean the Roof:</Text></Text>
  <Text style={[styles.text, { marginLeft: 16, marginBottom: 10 }]}>
    Ensure the roof surface, including all details, terminations, and upstands, is clean, dry, and free from debris, dust, and any loose material.
  </Text>

  <Text style={[styles.listItem, { marginBottom: 2 }]}>• <Text style={styles.label}>Inspect for Damage:</Text></Text>
  <Text style={[styles.text, { marginLeft: 16, marginBottom: 10 }]}>
    Inspect all details, terminations, and upstands for cracks, splits, or damages that need repair. Use RapidRoof Pro Detailer to repair minor damages. Allow repairs to cure fully.
  </Text>

  <Text style={[styles.listItem, { marginBottom: 2 }]}>• <Text style={styles.label}>Prepare Specific Areas:</Text></Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    <Text style={styles.label}>Details:</Text> Around vents, skylights, chimneys, and other roof penetrations, ensure the surfaces are clean and intact. Remove any old sealant or damaged materials.
  </Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    <Text style={styles.label}>Terminations:</Text> Ensure edges, eaves, and parapet walls are properly cleaned and free from any loose materials. Address any gaps or weaknesses.
  </Text>
  <Text style={[styles.text, { marginLeft: 16, marginBottom: 20 }]}>
    <Text style={styles.label}>Upstands:</Text> Clean vertical or inclined surfaces that connect to the main roof surface. Ensure these areas are smooth and ready for primer and waterproofing layers.
  </Text>

  {/* APPLICATION STEPS */}
  <Text style={[styles.label, { marginBottom: 10 }]}>Application Steps:</Text>

  <Text style={[styles.listItem, { marginBottom: 2 }]}>• <Text style={styles.label}>Apply Primer:</Text></Text>

  {guarantee !== '20-year' && fullyPrimedSurfaces.includes(surface) && (
    <Text style={[styles.text, { marginLeft: 16, marginBottom: 6 }]}>
      • Surface must be fully primed.
    </Text>
  )}

  <Text style={[styles.text, { marginLeft: 16 }]}>
    <Text style={styles.label}>Mix and Apply:</Text> Thoroughly mix RapidRoof Primer and Primer Catalyst. Apply a layer of primer at a coverage rate of 0.3kg per m² to {fullyPrimedSurfaces.includes(surface)
      ? 'the whole roof, details, terminations, and upstands'
      : 'joints, details, terminations, and upstands'} using a brush or roller. Ensure even coverage to a minimum height of 150mm.
  </Text>

  {(guarantee === '20-year' || fullyPrimedSurfaces.includes(surface)) && (
    <Text style={[styles.text, { marginLeft: 16 }]}>
      <Text style={styles.label}>Reinforcement:</Text> While the primer is still wet, reinforce any joints, cracks, splits and changes of substrate using 150gsm Joint Tape.
    </Text>
  )}

  <Text style={[styles.text, { marginLeft: 16, marginBottom: 10 }]}>
    <Text style={styles.label}>Drying:</Text> Allow the primer to dry completely.
  </Text>

  <Text style={[styles.listItem, { marginBottom: 2 }]}>
    • <Text style={styles.label}>
      {guarantee === '20-year'
        ? 'Apply BaseCoat and Reinforcement Matting:'
        : 'Apply BaseCoat:'}
    </Text>
  </Text>

  <Text style={[styles.text, { marginLeft: 16 }]}>
    <Text style={styles.label}>Mix BaseCoat:</Text> Thoroughly mix RapidRoof BaseCoat with the Waterproof Catalyst.
  </Text>

  <Text style={[styles.text, { marginLeft: 16 }]}>
    <Text style={styles.label}>Apply BaseCoat:</Text> Apply the BaseCoat at a coverage rate of {guarantee === '20-year' ? '1.25kg' : '1kg'} per m² to all prepared areas, ensuring coverage to a minimum height of 150mm.
  </Text>

  {guarantee === '20-year' && (
    <Text style={[styles.text, { marginLeft: 16 }]}>
      <Text style={styles.label}>Reinforcement Matting:</Text> For additional strength, especially at transitions and corners, embed 150gsm reinforcement matting into the wet BaseCoat. Smooth out with a roller or brush to remove air pockets and ensure proper adhesion.
    </Text>
  )}

  <PdfFooter guarantee={guarantee} />
</Page>

{/* Página 26 - Parte 3 */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  {/* DETAILER */}
  <Text style={styles.listItem}>• <Text style={styles.label}>Apply Detailer for Specific Areas (If Required):</Text></Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    <Text style={styles.label}>Mix Detailer:</Text> Thoroughly mix RapidRoof Pro Detailer and Catalyst.
  </Text>
  <Text style={[styles.text, { marginLeft: 16, marginBottom: 10 }]}>
    <Text style={styles.label}>Apply Detailer:</Text> Use RapidRoof Pro Detailer to seal around penetrations, terminations, upstands, and to fill any pinholes ensuring a seamless and watertight finish. Apply the Detailer to a minimum height of 150mm above the roof surface. Use a brush to work the Detailer into tight spots and transitions.
  </Text>

  {/* TOPCOAT */}
  <Text style={styles.listItem}>• <Text style={styles.label}>Apply TopCoat:</Text></Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    <Text style={styles.label}>Mix TopCoat:</Text> Thoroughly mix RapidRoof TopCoat with the Waterproof Catalyst.
  </Text>
  <Text style={[styles.text, { marginLeft: 16, marginBottom: 20 }]}>
    <Text style={styles.label}>Apply TopCoat:</Text> Apply a layer of TopCoat at a coverage rate of {guarantee === '20-year' ? '0.75kg' : '0.5kg'} per m² to all detailed areas, terminations, and upstands. Ensure even coverage and smooth application, extending to a minimum height of 150mm above the roof surface.
  </Text>

  {/* FINAL INSPECTION */}
  <Text style={[styles.label, { marginBottom: 10 }]}>Final Inspection and Protection:</Text>

  <Text style={styles.listItem}>• <Text style={styles.label}>Inspect and Smooth:</Text></Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Inspect the applied coatings for any bubbles, wrinkles, pinholes or uncoated areas. Smooth out any imperfections and ensure the surface is even.
  </Text>

  <Text style={styles.listItem}>• <Text style={styles.label}>Allow to Cure:</Text></Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Allow all applied RapidRoof products to cure completely, this is typically 20 minutes depending on weather conditions.
  </Text>

  <Text style={styles.listItem}>• <Text style={styles.label}>Protection:</Text></Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Cover any landscaping or structures near the roof with tarpaulin to protect them during the application process.
  </Text>

  <Text style={styles.listItem}>• <Text style={styles.label}>Documentation:</Text></Text>
  <Text style={[styles.text, { marginLeft: 16, marginBottom: 20 }]}>
    Take photos before, during, and after the application to document the condition of the roof and the work completed.
  </Text>

  {/* CIERRE */}
  <Text style={[styles.text, { marginTop: 10 }]}>
    By following these steps, you ensure that all existing details, terminations, and upstands on the roof are properly treated and waterproofed to a minimum height of 150mm, providing a durable and effective waterproofing solution.
  </Text>

  <PdfFooter guarantee={guarantee} />
</Page> 

{/* Página 27 - Guide to Waterproofing into a Chase (Parte 1) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  {/* TÍTULO PRINCIPAL */}
  <Text style={styles.sectionTitle}>
    Guide to Waterproofing into a Chase
  </Text>
  <Text style={[styles.label, { marginBottom: 6 }]}>Objective:</Text>
  <Text style={[styles.text, { marginBottom: 20 }]}>
    Properly waterproof into a chase to ensure a watertight seal and prevent water ingress at junctions between roof surfaces and walls or other vertical structures.
  </Text>

  {/* MATERIALS NEEDED */}
  <Text style={[styles.label, { marginBottom: 6 }]}>Materials Needed:</Text>
  <Text style={styles.listItem}>• Safety equipment (gloves, goggles, non-slip shoes)</Text>
  {guarantee === '20-year' ? (
    <>
      <Text style={styles.listItem}>• Waterproofing membrane (e.g., RapidRoof products)</Text>
      <Text style={styles.listItem}>• Primer (if required by the waterproofing system)</Text>
      <Text style={styles.listItem}>• BaseCoat and TopCoat (if using a layered waterproofing system)</Text>
      <Text style={styles.listItem}>• Sealant suitable for masonry and waterproofing</Text>
    </>
  ) : (
    <>
      <Text style={styles.listItem}>• Primer</Text>
      <Text style={styles.listItem}>• RapidRoof BaseCoat and TopCoat</Text>
      <Text style={styles.listItem}>• LRS PU Mastic for masonry and waterproofing</Text>
    </>
  )}
  <Text style={styles.listItem}>• Chasing tool (angle grinder with diamond blade or masonry chisel)</Text>
  <Text style={styles.listItem}>• Cleaning tools (brush, vacuum)</Text>
  <Text style={styles.listItem}>• Measuring tools (tape measure, level)</Text>
  <Text style={styles.listItem}>• Application tools (roller, brush{guarantee === '20-year' ? ', squeegee' : ''})</Text>
  {guarantee === '20-year' && <Text style={styles.listItem}>• Reinforcement matting (if required)</Text>}
  <Text style={styles.listItem}>• Clean cloth or brush</Text>
  <Text style={styles.listItem}>• Masking tape</Text>
  <Text style={styles.listItem}>• Ladder or scaffolding (if necessary)</Text>
  <Text style={styles.listItem}>• Tarpaulin (to protect landscaping and nearby structures)</Text>
  <Text style={[styles.listItem, { marginBottom: 20 }]}>• Mortar mix or cementitious repair product</Text>

  {/* SAFETY */}
  <Text style={[styles.label, { marginBottom: 6 }]}>Safety Precautions:</Text>
  <Text style={styles.listItem}>• Weather Check: Ensure weather conditions are dry and the temperature is {guarantee === '20-year' ? "within the manufacturer's recommended range" : 'within 0°c to 35°c temperature range'}. Avoid working on windy or rainy days.</Text>
  <Text style={styles.listItem}>• Safety Gear: Wear appropriate safety gear including gloves, goggles, and non-slip shoes.{guarantee !== '20-year' && ' Please read the RapidRoof MSDS for more information.'}</Text>
  <Text style={styles.listItem}>• Fall Protection: Use a harness or secure ladder and scaffolding if working on a steep or high roof.</Text>
  <Text style={styles.listItem}>• Electrical Hazards: Be aware of overhead power lines and ensure all power tools are used safely.</Text>

  <PdfFooter guarantee={guarantee} />
</Page>

{/* Página 28 - Parte 2 */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  {/* PREPARATION STEPS */}
  <Text style={[styles.label, { marginBottom: 6 }]}>Preparation Steps:</Text>
  <Text style={styles.listItem}>• Determine the Location of the Chase:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Identify the area where the chase needs to be cut. Typically, this will be where the roof meets a vertical structure, such as a wall.
  </Text>

  <Text style={styles.listItem}>• Cut the Chase:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Use an angle grinder with a diamond blade or a masonry chisel to cut a horizontal chase into the wall{guarantee !== '20-year' ? ' at the height of 150mm' : ''}. The depth and width of the chase should be sufficient to embed the waterproofing membrane securely (usually about 20–25mm deep and wide).
  </Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Ensure the chase is level and continuous along the length where waterproofing is required.
  </Text>

  <Text style={styles.listItem}>• Clean the Chase:</Text>
  <Text style={[styles.text, { marginLeft: 16, marginBottom: 20 }]}>
    Remove all dust and debris from the chase using a brush and vacuum. The chase should be clean and dry before applying any waterproofing materials.
  </Text>

{/* APPLICATION STEPS */}
<Text style={[styles.label, { marginBottom: 6 }]}>Application Steps:</Text>

{guarantee === '20-year' ? (
  <>
    <Text style={styles.listItem}>• Apply Primer:</Text>
    <Text style={[styles.text, { marginLeft: 16 }]}>
      If using a waterproofing system that requires a primer, apply it to the roof surface and into the chase according to the manufacturer’s instructions. Allow the primer to dry completely.
    </Text>
  </>
) : (
  <>
    <Text style={styles.listItem}>• Apply Primer:</Text>
    {!fullyPrimedSurfaces.includes(surface) && (
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Brickwork should be fully primed.
  </Text>
)}
    <Text style={[styles.text, { marginLeft: 16, marginBottom: 10 }]}>
      Apply RapidRoof Primer at a coverage rate of 0.3kg per m² to the upstand and into the chase. Allow the primer to dry completely, typically 20 minutes.
    </Text>
  </>
)}

 {/* BASECOAT Y TOPCOAT */}
 {guarantee === '20-year' ? (
    <>
      <Text style={styles.listItem}>• Apply BaseCoat and Reinforcement Matting (if required):</Text>
      <Text style={[styles.text, { marginLeft: 16 }]}>
        <Text style={styles.label}>Mix BaseCoat:</Text> Thoroughly mix the BaseCoat product according to the manufacturer’s instructions.
      </Text>
      <Text style={[styles.text, { marginLeft: 16 }]}>
        <Text style={styles.label}>Apply BaseCoat:</Text> Apply the BaseCoat to the roof surface, extending it into the chase. Work the BaseCoat into the chase using a brush or small roller.
      </Text>
      <Text style={[styles.text, { marginLeft: 16 }]}>
        <Text style={styles.label}>Reinforcement Matting:</Text> If required, embed reinforcement matting into the wet BaseCoat, ensuring it extends into the chase and is fully saturated.
      </Text>

      <Text style={styles.listItem}>• Apply Waterproofing Membrane:</Text>
      <Text style={[styles.text, { marginLeft: 16 }]}>
        Apply the waterproofing membrane (such as RapidRoof products) onto the BaseCoat, extending it into the chase. Ensure the membrane is pressed firmly into the chase and is free of air pockets and wrinkles.
      </Text>

      <Text style={styles.listItem}>• Second Layer:</Text>
      <Text style={[styles.text, { marginLeft: 16 }]}>
        Apply a second layer of the BaseCoat or TopCoat over the membrane, ensuring complete coverage and sealing it into the chase.
      </Text>
    </>
  ) : (
    <>
      <Text style={styles.listItem}>• Apply BaseCoat:</Text>
      <Text style={[styles.text, { marginLeft: 16 }]}>
        Mix BaseCoat: Thoroughly mix the RapidRoof BaseCoat with the waterproof catalyst using a mixing stick or drill and mixing attachment.
      </Text>
      <Text style={[styles.text, { marginLeft: 16 }]}>
        Apply BaseCoat: Apply the RapidRoof BaseCoat to the upstand, extending it into the chase at a coverage rate of 1kg per m². Work the RapidRoof BaseCoat into the chase using a brush or small roller.
      </Text>

      <Text style={styles.listItem}>• Apply TopCoat:</Text>
      <Text style={[styles.text, { marginLeft: 16 }]}>
        Apply RapidRoof TopCoat over the cured BaseCoat at a coverage rate of 0.5kg per m², ensuring complete coverage and sealing it into the chase.
      </Text>
    </>
  )}

<PdfFooter guarantee={guarantee} />
</Page>

{/* Página 29 - Parte 3 */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />


  {/* SEALING */}
  <Text style={styles.listItem}>• Seal the Chase:</Text>

  {guarantee === '20-year' ? (
    <>
      <Text style={[styles.text, { marginLeft: 16 }]}>
        <Text style={styles.label}>Apply Sealant:</Text> Once the waterproofing layers are dry, apply a high-quality sealant suitable for masonry and waterproofing systems into the chase. This will provide an additional seal and help secure the membrane in place.
      </Text>
      <Text style={[styles.text, { marginLeft: 16 }]}>
        <Text style={styles.label}>Mortar Mix:</Text> Mix a suitable mortar or cementitious repair product and fill the chase, pressing it firmly to embed the membrane and sealant securely. Smooth the surface for a neat finish.
      </Text>
    </>
  ) : (
    <Text style={[styles.text, { marginLeft: 16 }]}>
      <Text style={styles.label}>Apply Sealant:</Text> Once the waterproofing layers are dry, apply LRS PU Mastic into the chase. This will provide an additional seal and help secure and terminate the waterproofing.
    </Text>
  )}

  {/* FINAL INSPECTION */}
  <Text style={[styles.label, { marginTop: 20, marginBottom: 6 }]}>Final Inspection and Protection:</Text>
  <Text style={styles.listItem}>• Inspect and Smooth:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Inspect the waterproofed area for any bubbles, wrinkles, or uncovered sections. Smooth out any imperfections and ensure the membrane is securely {guarantee === '20-year' ? 'embedded' : 'waterproofed'} in the chase.
  </Text>

  <Text style={styles.listItem}>• Allow to Cure:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Allow all applied materials to cure completely {guarantee === '20-year' ? 'according to the manufacturer’s instructions' : 'according to this specification'}.
  </Text>

  <Text style={styles.listItem}>• Protection:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Cover any landscaping or structures near the roof with tarpaulin to protect them during the application process.
  </Text>

  <Text style={styles.listItem}>• Documentation:</Text>
  <Text style={[styles.text, { marginLeft: 16, marginBottom: 10 }]}>
    Take photos before, during, and after the application to document the condition of the roof and the work completed.
  </Text>

  <Text style={styles.text}>
    By following these steps, you ensure that the waterproofing into a chase is properly executed, creating a durable and watertight seal that will protect against water ingress at junctions between roof surfaces and vertical structures.
  </Text>

  <PdfFooter guarantee={guarantee} />
</Page>

{(guarantee === '20-year' || (guarantee === '10-year' && fullyPrimedSurfaces.includes(surface))) && (
  <>
    {/* Página 30 */}
    <Page size="A4" style={styles.page}>
      <PdfHeader reference={reference} />

      {/* TÍTULO PRINCIPAL */}
      <Text style={styles.sectionTitle}>
        Guide to Applying RapidRoof Primer on {surface}
      </Text>

      {guarantee === '10-year' && fullyPrimedSurfaces.includes(surface) && (
        <Text style={[styles.text, { marginBottom: 10 }]}>
          The roof surface should be fully primed using RapidRoof Primer.
        </Text>
      )}

      {/* OBJECTIVE */}
      <Text style={[styles.label, { marginBottom: 6 }]}>Objective:</Text>
      <Text style={[styles.text, { marginBottom: 20 }]}>
        Apply RapidRoof Primer at a coverage rate of 0.3kg per m² to ensure proper adhesion and performance of subsequent RapidRoof layers.
      </Text>

      {/* MATERIALS NEEDED */}
      <Text style={[styles.label, { marginBottom: 6 }]}>Materials Needed:</Text>
      <Text style={styles.listItem}>• Safety equipment (gloves, goggles, non-slip shoes)</Text>
      <Text style={styles.listItem}>• RapidRoof Primer</Text>
      <Text style={styles.listItem}>• Mixing stick or drill with a mixing attachment</Text>
      <Text style={styles.listItem}>• Measuring tools (scale for measuring Primer, tape measure for area calculation)</Text>
      <Text style={styles.listItem}>• Application tools (Short pile roller or brush)</Text>
      <Text style={styles.listItem}>• Roller extension pole (for easy application on larger areas)</Text>
      <Text style={styles.listItem}>• Clean cloth or brush</Text>
      <Text style={styles.listItem}>• Ladder or scaffolding (if necessary)</Text>
      <Text style={[styles.listItem, { marginBottom: 20 }]}>• Tarpaulin (to protect landscaping and nearby structures)</Text>

      {/* SAFETY PRECAUTIONS */}
      <Text style={[styles.label, { marginBottom: 6 }]}>Safety Precautions:</Text>
      <Text style={styles.listItem}>• Weather Check: Ensure weather conditions are dry, and the temperature is between 0°c and 35°c recommended range. Avoid working on windy or rainy days.</Text>
      <Text style={styles.listItem}>• Safety Gear: Wear appropriate safety gear including gloves, goggles, and non-slip shoes.</Text>
      <Text style={styles.listItem}>• Fall Protection: Use a harness or secure ladder and scaffolding if working on a steep or high roof.</Text>
      <Text style={[styles.listItem, { marginBottom: 20 }]}>• Electrical Hazards: Be aware of overhead power lines.</Text>

      {/* PREPARATION STEPS */}
      <Text style={[styles.label, { marginBottom: 6 }]}>Preparation Steps:</Text>
      <Text style={styles.listItem}>• Clean the Roof:</Text>
      <Text style={[styles.text, { marginLeft: 16 }]}>
        Ensure the roof surface is clean, dry, and free from debris, dust, and any loose material. Follow the cleaning steps outlined in previous guides.
      </Text>

      <Text style={styles.listItem}>• Inspect the Roof:</Text>
      <Text style={[styles.text, { marginLeft: 16 }]}>
        Check for any remaining cracks, splits, or damages that need repair. Ensure all repairs are completed and fully cured before applying the primer.
      </Text>

      <PdfFooter guarantee={guarantee} />
    </Page>

    {/* Página 31 */}
    <Page size="A4" style={styles.page}>
      <PdfHeader reference={reference} />

      {/* APPLICATION OF PRIMER */}
      <Text style={[styles.label, { marginBottom: 6 }]}>Application of RapidRoof Primer:</Text>
      <Text style={styles.listItem}>• Measure the Area:</Text>
      <Text style={[styles.text, { marginLeft: 16 }]}>
        Measure the area of the roof to calculate the amount of RapidRoof Primer required. At a coverage rate of 0.3kg per m², ensure you have sufficient product to cover the entire roof.
      </Text>

      <Text style={styles.listItem}>• Mix RapidRoof Primer:</Text>
      <Text style={[styles.text, { marginLeft: 16 }]}>
        Thoroughly mix the RapidRoof Primer with the Primer Catalyst. Use a mixing stick or a drill with a mixing attachment to achieve an even consistency.
      </Text>

      <Text style={styles.listItem}>• Apply Primer:</Text>
      <Text style={[styles.text, { marginLeft: 16 }]}>
        Using a short pile roller or brush, apply the RapidRoof Primer at a coverage rate of 0.3kg per m².
      </Text>
      <Text style={[styles.text, { marginLeft: 16 }]}>
        Work in manageable sections to ensure even coverage and to avoid the product drying out before it is spread properly.
      </Text>

      <Text style={styles.listItem}>• Ensure Even Coverage:</Text>
      <Text style={[styles.text, { marginLeft: 16 }]}>
        Apply the primer evenly, making sure to cover all areas thoroughly without leaving gaps or thin spots.
      </Text>
      <Text style={[styles.text, { marginLeft: 16 }]}>
        Feather the edges to blend the primer smoothly with any surrounding surfaces or layers.
      </Text>

      <Text style={styles.listItem}>• Inspect and Smooth:</Text>
      <Text style={[styles.text, { marginLeft: 16 }]}>
        Use the roller or brush to smooth out any bubbles or imperfections. Ensure the surface is even and fully coated.
      </Text>

      {/* DRYING AND FINAL INSPECTION */}
      <Text style={[styles.label, { marginBottom: 6, marginTop: 10 }]}>Drying and Curing:</Text>
      <Text style={styles.listItem}>• Allow to Dry:</Text>
      <Text style={[styles.text, { marginLeft: 16 }]}>
        Allow the RapidRoof Primer to dry completely. The drying time will depend on weather conditions; this is typically 20 minutes.
      </Text>

      <Text style={styles.listItem}>• Final Inspection:</Text>
      <Text style={[styles.text, { marginLeft: 16 }]}>
        Perform a final inspection of the applied primer. Ensure there are no visible bubbles or uncoated areas.
      </Text>

      {/* FINAL STEPS */}
      <Text style={[styles.label, { marginBottom: 6, marginTop: 10 }]}>Final Steps:</Text>
      <Text style={styles.listItem}>• Protection:</Text>
      <Text style={[styles.text, { marginLeft: 16 }]}>
        Cover any landscaping or structures near the roof with tarpaulin to protect them during the application process.
      </Text>

      <Text style={styles.listItem}>• Documentation:</Text>
      <Text style={[styles.text, { marginLeft: 16, marginBottom: 10 }]}>
        Take photos before, during, and after the application to document the condition of the roof and the work completed.
      </Text>

      <Text style={styles.text}>
        By following these steps, you ensure that the RapidRoof Primer is properly applied, creating a suitable base for the subsequent application of RapidRoof BaseCoat, TopCoat, or other layers as required.
      </Text>

      <PdfFooter guarantee={guarantee} />
    </Page>
  </>
)}

{/* Página 32 - RapidRoof BaseCoat (parte 1/2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  {/* TÍTULO PRINCIPAL */}
  <Text style={styles.sectionTitle}>RapidRoof BaseCoat</Text>

  {/* SUBTÍTULO */}
  <Text style={[styles.text, { marginBottom: 10 }]}>
    {guarantee === '20-year'
      ? 'Guide to Applying RapidRoof BaseCoat with Reinforcement Matting'
      : fullyPrimedSurfaces.includes(surface)
        ? 'Guide to Applying RapidRoof BaseCoat to all areas.'
        : 'Guide to Applying RapidRoof BaseCoat'}
  </Text>

  {/* OBJECTIVE */}
  <Text style={[styles.label, { marginBottom: 6 }]}>Objective:</Text>
  <Text style={[styles.text, { marginBottom: 20 }]}>
    Apply RapidRoof BaseCoat{guarantee === '20-year' ? ' with 150gsm reinforcement matting at a coverage rate of 1.25kg per m²' : ' at a coverage rate of 1kg per m²'} to ensure a durable and waterproof roof surface.
  </Text>

  {/* MATERIALS NEEDED */}
  <Text style={[styles.label, { marginBottom: 6 }]}>Materials Needed:</Text>
  <Text style={styles.listItem}>• Safety equipment (gloves, goggles, non-slip shoes)</Text>
  <Text style={styles.listItem}>• RapidRoof BaseCoat</Text>
  {guarantee === '20-year' && (
    <Text style={styles.listItem}>• 150gsm Reinforcement Matting</Text>
  )}
  <Text style={styles.listItem}>• Mixing stick or drill with a mixing attachment</Text>
  <Text style={styles.listItem}>• Measuring tools (scale for measuring BaseCoat, tape measure for area calculation)</Text>
  <Text style={styles.listItem}>• Application tools (roller or brush)</Text>
  <Text style={styles.listItem}>• Roller extension pole (for easy application on larger areas)</Text>
  <Text style={styles.listItem}>• Clean cloth or brush</Text>
  <Text style={styles.listItem}>• Ladder or scaffolding (if necessary)</Text>
  <Text style={[styles.listItem, { marginBottom: 20 }]}>• Tarpaulin (to protect landscaping and nearby structures)</Text>

  {/* SAFETY PRECAUTIONS */}
  <Text style={[styles.label, { marginBottom: 6 }]}>Safety Precautions:</Text>
  <Text style={styles.listItem}>• Weather Check: Ensure weather conditions are dry and the temperature is between 0°c to 35°c recommended range. Avoid working on windy or rainy days.</Text>
  <Text style={styles.listItem}>• Safety Gear: Wear appropriate safety gear including gloves, goggles, and non-slip shoes.</Text>
  <Text style={styles.listItem}>• Fall Protection: Use a harness or secure ladder and scaffolding if working on a steep or high roof.</Text>
  <Text style={[styles.listItem, { marginBottom: 20 }]}>• Electrical Hazards: Be aware of overhead power lines.</Text>

   {/* PREPARATION STEPS */}
   <Text style={[styles.label, { marginBottom: 6 }]}>Preparation Steps:</Text>
  <Text style={styles.listItem}>• Clean the Roof:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Ensure the roof surface is clean, dry, and free from debris, dust, and any loose material. Follow the cleaning steps outlined in previous guides.
  </Text>

  <Text style={styles.listItem}>• Inspect the Roof:</Text>
  <Text style={[styles.text, { marginLeft: 16, marginBottom: 20 }]}>
    Check for any remaining cracks, splits, or damage that need repair. Ensure all repairs are completed and fully cured before application.
  </Text>


  <PdfFooter guarantee={guarantee} />
</Page>

{/* Página 33 - RapidRoof BaseCoat (parte 2/2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />


  {/* APPLICATION */}
  <Text style={[styles.label, { marginBottom: 6, width: '100%' }]}>
  {guarantee === '20-year'
    ? 'Application of RapidRoof BaseCoat with Reinforcement Matting:'
    : 'Application of RapidRoof BaseCoat:'}
</Text>




  {guarantee === '20-year' ? (
    <>
      <Text style={styles.listItem}>• Measure and Cut Matting:</Text>
      <Text style={[styles.text, { marginLeft: 16 }]}>
        Measure the area of the roof and cut the 150gsm reinforcement matting to fit, allowing for overlaps as specified by the manufacturer (typically 50–100mm).
      </Text>
    </>
  ) : (
    <>
      <Text style={styles.listItem}>• Measure Area or Grid Out Tins:</Text>
      <Text style={[styles.text, { marginLeft: 16 }]}>
        Measure the area of the roof and ensure the RapidRoof BaseCoat is applied to the correct coverage rate.
      </Text>
    </>
  )}

  <Text style={styles.listItem}>• Mix RapidRoof BaseCoat:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Thoroughly mix the RapidRoof BaseCoat and Waterproof Catalyst. Use a mixing stick or a drill with a mixing attachment for even consistency.
  </Text>

  <Text style={styles.listItem}>• Apply BaseCoat:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Using a roller and brush, apply a layer of RapidRoof BaseCoat at a coverage rate of {guarantee === '20-year' ? '1.25kg per m²' : '1kg per m²'}. Work in manageable sections to ensure the BaseCoat does not dry before {guarantee === '20-year' ? 'laying the matting' : 'the mixed product is applied'}.
  </Text>

  {guarantee === '20-year' && (
    <>
      <Text style={styles.listItem}>• Lay Reinforcement Matting:</Text>
      <Text style={[styles.text, { marginLeft: 16 }]}>
        Immediately lay the 150gsm reinforcement matting onto the wet BaseCoat. Press the matting into the BaseCoat to eliminate air pockets and wrinkles. Use a roller to ensure the matting is fully embedded and saturated.
      </Text>
      <Text style={[styles.text, { marginLeft: 16 }]}>
        Feather the edges to blend the reinforced area with the surrounding roof surface.
      </Text>
    </>
  )}

  <Text style={styles.listItem}>• Smooth and Inspect:</Text>
  <Text style={[styles.text, { marginLeft: 16, marginBottom: 20 }]}>
    Use the roller or brush to smooth out any bubbles or imperfections{guarantee === '20-year' ? '. Ensure the matting is fully embedded and the surface is even.' : '.'}
  </Text>

  {/* DRYING AND FINAL INSPECTION */}
  <Text style={[styles.label, { marginBottom: 6 }]}>Drying and Curing:</Text>
  <Text style={styles.listItem}>• Allow to Dry:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Allow the RapidRoof BaseCoat{guarantee === '20-year' ? ' with reinforcement matting' : ''} to dry completely. The drying time will depend on weather conditions, typically 20 minutes.
  </Text>

  <Text style={styles.listItem}>• Final Inspection:</Text>
  <Text style={[styles.text, { marginLeft: 16, marginBottom: 20 }]}>
    Perform a final inspection of the applied BaseCoat{guarantee === '20-year' ? ' and matting' : ''}. Ensure there are no visible bubbles, wrinkles, pinholes or uncoated areas.
  </Text>

  {/* FINAL STEPS */}
  <Text style={[styles.label, { marginBottom: 6 }]}>Final Steps:</Text>
  <Text style={styles.listItem}>• Protection:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Cover any landscaping or structures near the roof with tarpaulin to protect them during the application process.
  </Text>

  <Text style={styles.listItem}>• Documentation:</Text>
  <Text style={[styles.text, { marginLeft: 16, marginBottom: 10 }]}>
    Take photos before, during, and after the application to document the condition of the roof and the work completed.
  </Text>

  <Text style={styles.text}>
    By following these steps, you ensure that the RapidRoof BaseCoat{guarantee === '20-year' ? ' with 150gsm reinforcement matting' : ''} is properly applied, creating a durable and waterproof surface ready for further layers or final finishes as needed.
  </Text>

  <PdfFooter guarantee={guarantee} />
</Page>


{/* Página 34 - RapidRoof BaseCoat – Inspect (parte 1/2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  {/* TÍTULO PRINCIPAL */}
  <Text style={styles.sectionTitle}>
    {guarantee === '20-year'
      ? 'RapidRoof Pro BaseCoat – Inspect'
      : 'RapidRoof BaseCoat – Inspect'}
  </Text>

  {/* SUBTÍTULO */}
  <Text style={[styles.text, { marginBottom: 10 }]}>
    Steps for Checking RapidRoof BaseCoat
  </Text>

  {/* VERIFY COVERAGE RATES */}
  <Text style={[styles.label, { marginBottom: 6 }]}>Verify Coverage Rates:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Required Rate: The RapidRoof BaseCoat should be applied at a coverage rate of{' '}
    {guarantee === '20-year' ? '1.25kg per m².' : '1kg per m².'}
  </Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Calculate Area: Measure the total area of the roof section that has been coated.
  </Text>
  <Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>
    Check Usage: Compare the amount of BaseCoat used to the calculated area to ensure it aligns with the recommended coverage rate. For example, if you coated 20m², you should have used approximately {guarantee === '20-year' ? '25kg' : '20kg'} of BaseCoat (20m² x {guarantee === '20-year' ? '1.25kg/m²' : '1kg/m²'}){guarantee !== '20-year' ? ' this doesn’t include any wastage.' : '.'}
  </Text>

  {/* INSPECT FOR PINHOLES */}
  <Text style={[styles.label, { marginBottom: 6 }]}>Inspect for Pinholes:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Visual Inspection: Perform a thorough visual inspection of the coated surface. Look for small holes or gaps in the coating, known as pinholes.
  </Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Lighting: Use a flashlight to shine light across the surface at a low angle. Pinholes will cast small shadows or show up as bright spots.
  </Text>
  {guarantee === '20-year' && (
    <Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>
      Magnification: Use a magnifying glass to inspect suspicious areas more closely.
    </Text>
  )}

  {/* ENSURE COMPLETE COVERAGE */}
  <Text style={[styles.label, { marginBottom: 6 }]}>Ensure Complete Coverage:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Uniform Thickness: Ensure the coating is uniform in thickness across the entire roof. There should be no thin spots or exposed substrate.
  </Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Edges and Corners: Pay special attention to edges, corners, and transitions, as these areas are more prone to insufficient coverage.
  </Text>
  <Text style={[styles.text, { marginLeft: 16, marginBottom: 20 }]}>
    Overlaps: Check overlaps where different sections meet to ensure they are seamless and properly bonded.
  </Text>

  <PdfFooter guarantee={guarantee} />
</Page>

{/* Página 35 - RapidRoof BaseCoat – Inspect (parte 2/2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  {/* ADDRESSING DEFICIENCIES */}
  <Text style={[styles.label, { marginBottom: 6 }]}>Addressing Deficiencies:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Pinholes: If pinholes are found, mark them with chalk or tape. Prepare a small amount of RapidRoof Pro Detailer and use a brush to fill in the pinholes.
  </Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Thin Areas: If you find areas with insufficient coverage, apply an additional layer of BaseCoat to achieve the recommended thickness.
  </Text>
  <Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>
    Uniformity: Use a roller or brush to smooth out any uneven areas and ensure a uniform coating.
  </Text>

  {/* FINAL INSPECTION */}
  <Text style={[styles.label, { marginBottom: 6 }]}>Final Inspection:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Curing Check: Allow the BaseCoat to dry, typically 20 minutes. Once cured, perform a final inspection to ensure all touch-ups and additional layers have properly adhered.
  </Text>
  <Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>
    Complete Coating: Verify that the entire roof surface is completely coated and protected. There should be no visible substrate or inconsistencies in the coating.
  </Text>

  {/* DOCUMENTATION */}
  <Text style={[styles.label, { marginBottom: 6 }]}>Documentation:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Photos: Take photos of the roof before, during, and after the application to document the condition and coverage of the BaseCoat.
  </Text>
  <Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>
    Notes: Keep detailed notes on the amount of product used, the area covered, and any issues encountered during the application and inspection process.
  </Text>

  {/* CIERRE */}
  <Text style={[styles.text, { marginTop: 20 }]}>
    By following these steps, you ensure that the RapidRoof BaseCoat is applied correctly, achieving the required coverage rate, and providing a uniform, pinhole-free, and completely coated roof surface. This thorough inspection and correction process helps maintain the integrity and longevity of the roofing system.
  </Text>

  <PdfFooter guarantee={guarantee} />
</Page>

{/* Página 36 - RapidRoof TopCoat (parte 1/2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  {/* TÍTULO PRINCIPAL */}
  <Text style={styles.sectionTitle}>
    {guarantee === '20-year'
      ? 'RapidRoof Pro TopCoat'
      : 'RapidRoof TopCoat'}
  </Text>

  {/* SUBTÍTULO */}
  <Text style={[styles.text, { marginBottom: 10 }]}>
    Guide to Applying RapidRoof TopCoat on a Roof
  </Text>

  {/* OBJETIVO */}
  <Text style={[styles.label, { marginBottom: 6 }]}>Objective:</Text>
  <Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>
    Apply RapidRoof TopCoat at a coverage rate of {guarantee === '20-year' ? '0.75kg per m²' : '0.5kg per m²'} to ensure a durable and waterproof roof surface.
  </Text>

  {/* MATERIALES */}
  <Text style={[styles.label, { marginBottom: 6 }]}>Materials Needed:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>Safety equipment (gloves, goggles, non-slip shoes)</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>RapidRoof TopCoat</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>Mixing stick or drill with a mixing attachment</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>Measuring tools (scale for measuring TopCoat, tape measure for area calculation)</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>Application tools (roller or brush)</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>Roller extension pole (for easy application on larger areas)</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>Clean cloth or brush</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>Ladder or scaffolding (if necessary)</Text>
  <Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>Tarpaulin (to protect landscaping and nearby structures)</Text>

  {/* PRECAUCIONES */}
  <Text style={[styles.label, { marginBottom: 6 }]}>Safety Precautions:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>Weather Check: Ensure weather conditions are dry and the temperature is between 0°c to 35°c. Avoid working on windy or rainy days.</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>Safety Gear: Wear appropriate safety gear including gloves, goggles, and non-slip shoes.</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>Fall Protection: Use a harness or secure ladder and scaffolding if working on a steep or high roof.</Text>
  <Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>Electrical Hazards: Be aware of overhead power lines.</Text>

  {/* PREPARACIÓN */}
  <Text style={[styles.label, { marginBottom: 6 }]}>Preparation Steps:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>Clean the Roof</Text>
  <Text style={[styles.text, { marginLeft: 32 }]}>
    Ensure the roof surface is clean, dry, and free from debris, dust, and any loose material. Follow the cleaning steps outlined in previous guides.
  </Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>Inspect the Roof</Text>
  <Text style={[styles.text, { marginLeft: 32, marginBottom: 20 }]}>
    Check for any remaining cracks, splits, or damage that need repair. Ensure all repairs are completed and fully cured before application.
  </Text>

  <PdfFooter guarantee={guarantee} />
</Page>

{/* Página 37 - RapidRoof TopCoat (parte 2/2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  {/* APLICACIÓN */}
  <Text style={[styles.label, { marginBottom: 6 }]}>Application of RapidRoof TopCoat:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>Measure the Area</Text>
  <Text style={[styles.text, { marginLeft: 32 }]}>
    Measure the area of the roof to calculate the amount of RapidRoof TopCoat required. At a coverage rate of {guarantee === '20-year' ? '0.75kg' : '0.5kg'} per m², ensure you have sufficient product to cover the entire roof.
  </Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>Mix RapidRoof TopCoat</Text>
  <Text style={[styles.text, { marginLeft: 32 }]}>
    Thoroughly mix the RapidRoof TopCoat with the RapidRoof Waterproof Catalyst. Use a mixing stick or a drill with a mixing attachment to achieve an even consistency.
  </Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>Apply TopCoat</Text>
  <Text style={[styles.text, { marginLeft: 32 }]}>
    Using a roller or brush, apply the RapidRoof TopCoat at a coverage rate of {guarantee === '20-year' ? '0.75kg' : '0.5kg'} per m².
  </Text>
  <Text style={[styles.text, { marginLeft: 32 }]}>
    Work in manageable sections to ensure even coverage and to avoid the product drying out before it is spread properly.
  </Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>Ensure Even Coverage</Text>
  <Text style={[styles.text, { marginLeft: 32 }]}>
    Apply the TopCoat evenly, making sure to cover all areas thoroughly without leaving gaps or thin spots.
  </Text>
  <Text style={[styles.text, { marginLeft: 32 }]}>
    Feather the edges to blend the TopCoat smoothly with any surrounding surfaces or layers.
  </Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>Inspect and Smooth</Text>
  <Text style={[styles.text, { marginLeft: 32, marginBottom: 12 }]}>
    Use the roller or brush to smooth out any bubbles or imperfections. Ensure the surface is even and fully coated.
  </Text>

  {/* SECADO */}
  <Text style={[styles.label, { marginBottom: 6 }]}>Drying and Curing:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>Allow to Dry</Text>
  <Text style={[styles.text, { marginLeft: 32 }]}>
    Allow the RapidRoof TopCoat to dry completely. The drying time will depend on weather conditions.
  </Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>Final Inspection</Text>
  <Text style={[styles.text, { marginLeft: 32, marginBottom: 12 }]}>
    Perform a final inspection of the applied TopCoat. Ensure there are no visible bubbles, wrinkles, pinholes or uncoated areas.
  </Text>

  {/* CIERRE */}
  <Text style={[styles.label, { marginBottom: 6 }]}>Final Steps:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Protection: Cover any landscaping or structures near the roof with tarpaulin to protect them during the application process.
  </Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Documentation: Take photos before, during, and after the application to document the condition of the roof and the work completed.
  </Text>

  <Text style={[styles.text, { marginTop: 20 }]}>
    By following these steps, you ensure that the RapidRoof TopCoat is properly applied, creating a durable and waterproof surface that will protect the roof for years to come.
  </Text>

  <PdfFooter guarantee={guarantee} />
</Page>

{/* Página 38 - RapidRoof Anti-Skid (parte 1/2) */}
{antiSkid === 'Yes' && (
  <>
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={styles.sectionTitle}>RapidRoof Anti-Skid</Text>
  <Text style={[styles.text, { marginBottom: 10 }]}>
    Guide to Applying RapidRoof Anti-Skid Coating
  </Text>

  <Text style={[styles.label, { marginBottom: 6 }]}>Objective:</Text>
  <Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>
    Properly apply RapidRoof Anti-Skid coating at a rate of 1kg per m² over the waterproof layer, and back roll the surface to agitate the aggregate, ensuring a durable and effective anti-skid finish.
  </Text>

  <Text style={[styles.label, { marginBottom: 6 }]}>Materials Needed:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>• Safety equipment (gloves, goggles, non-slip shoes)</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>• RapidRoof Anti-Skid coating</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>• Mixing stick or drill with a mixing attachment</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>• Measuring tools (scale for measuring product, tape measure for area calculation)</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>• Application tools (roller or brush)</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>• Clean cloth or brush</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>• Ladder or scaffolding (if necessary)</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>• Tarpaulin (to protect landscaping and nearby structures)</Text>
  <Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>• Masking tape (for neat edges)</Text>

  <Text style={[styles.label, { marginBottom: 6 }]}>Safety Precautions:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>• Wear Safety Gear: Wear appropriate safety gear including gloves, goggles, and non-slip shoes to protect against splashes and fumes.</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>• Fall Protection: Use a harness or secure ladder and scaffolding if working on a steep or high roof.</Text>
  <Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>• Ventilation: Ensure good ventilation when mixing and applying the product.</Text>

  <Text style={[styles.label, { marginBottom: 6 }]}>Preparation Steps:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>• Ensure Waterproof Layer is Ready:</Text>
  <Text style={styles.textIndent}>The waterproof layer should be completely dry. Ensure there are no contaminants on the surface.</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>• Clean the Roof Surface:</Text>
  <Text style={styles.textIndent}>Ensure the roof surface is clean, dry, and free from debris, dust, and any loose material.</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>• Protect Surrounding Areas:</Text>
  <Text style={styles.textIndent}>Use tarpaulins or plastic sheeting to protect landscaping, walls, and other nearby structures from splashes.</Text>

  <PdfFooter guarantee={guarantee} />
</Page>

{/* Página 39 - RapidRoof Anti-Skid (parte 2/2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={[styles.label, { marginBottom: 6 }]}>Application Steps:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>• Measure and Prepare Anti-Skid Coating:</Text>
  <Text style={styles.textIndent}>Calculate Area: Measure the total area to be coated.</Text>
  <Text style={styles.textIndent}>Determine Amount Needed: Calculate the amount of Anti-Skid coating required (1kg per m²).</Text>

  <Text style={[styles.text, { marginLeft: 16 }]}>• Mix Anti-Skid Coating:</Text>
  <Text style={styles.textIndent}>Thoroughly mix the RapidRoof Anti-Skid coating with the Anti-Skid Catalyst. Ensure the aggregate is evenly distributed throughout the coating.</Text>

  <Text style={[styles.text, { marginLeft: 16 }]}>• Apply Anti-Skid Coating:</Text>
  <Text style={styles.textIndent}>Apply the Anti-Skid coating at a coverage rate of 1kg per m². Use a roller or brush to spread the coating evenly over the waterproof layer.</Text>
  <Text style={styles.textIndent}>Ensure the coating is applied uniformly without any missed spots or thin areas.</Text>

  <Text style={[styles.text, { marginLeft: 16 }]}>• Back Roll to Agitate Aggregate:</Text>
  <Text style={styles.textIndent}>Before the coating dries, back roll to agitate the aggregate.</Text>
  <Text style={styles.textIndent}>Lightly roll back over the surface in a crosshatch pattern. This agitation will help to evenly distribute the aggregate and create a consistent anti-skid texture.</Text>
  <Text style={styles.textIndent}>Ensure the aggregate is evenly distributed and the texture is consistent across the entire surface.</Text>

  <Text style={[styles.label, { marginTop: 12, marginBottom: 6 }]}>Final Steps:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>• Allow to Cure:</Text>
  <Text style={styles.textIndent}>Allow the Anti-Skid coating to dry completely, typically 20 minutes. Curing time may vary based on environmental conditions.</Text>

  <Text style={[styles.text, { marginLeft: 16 }]}>• Inspect the Surface:</Text>
  <Text style={styles.textIndent}>After curing, inspect the surface to ensure the anti-skid texture is uniform and the aggregate is properly embedded in the coating.</Text>
  <Text style={styles.textIndent}>Look for any areas that may require touch-up or additional coating.</Text>

  <Text style={[styles.text, { marginLeft: 16 }]}>• Clean Up:</Text>
  <Text style={styles.textIndent}>Clean all tools and equipment immediately after use. Dispose of any waste materials according to local regulations.</Text>

  <Text style={[styles.text, { marginLeft: 16 }]}>• Document the Application:</Text>
  <Text style={styles.textIndent}>Take photos before, during, and after the application to document the condition of the roof and the work completed.</Text>
  <Text style={styles.textIndent}>Keep detailed notes on the amount of product used, the area covered, and any issues encountered during the application.</Text>

  <Text style={[styles.text, { marginTop: 20 }]}>
    By following these steps, you ensure that the RapidRoof Anti-Skid coating is applied correctly, providing a durable and effective anti-skid finish that enhances the safety and longevity of the roofing surface.
  </Text>

  <PdfFooter guarantee={guarantee} />
</Page>
</>
)}

{/* Página 40 - Completed Roof Surface (parte 1/2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={styles.sectionTitle}>Completed Roof Surface</Text>
  <Text style={[styles.text, { marginBottom: 10 }]}>
    Guide to Visual Inspection of the Completed Roof Surface
  </Text>

  <Text style={[styles.label, { marginBottom: 6 }]}>Objective:</Text>
  <Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>
    {guarantee === '20-year'
      ? 'Conduct a thorough visual inspection of the completed roof surface to ensure there are no pinholes, the coverage is even, details are correctly applied at 150mm, and Reinforcement Matting is properly installed on all details.'
      : 'Conduct a thorough visual inspection of the completed roof surface to ensure there are no pinholes, the coverage is even, details are correctly applied at 150mm, and all joints, cracks, splits and changes of substrate are reinforced with Joint Tape.'}
  </Text>

  <Text style={[styles.label, { marginBottom: 6 }]}>Materials Needed:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>• Safety equipment (gloves, goggles, non-slip shoes)</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>• Flashlight</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>• Measuring tape or ruler</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>• Inspection mirror (optional for hard-to-reach areas)</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>• Notepad and pen (for documentation)</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>• Camera (for photographic documentation)</Text>
  <Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>• Ladder or scaffolding (if necessary)</Text>

  <Text style={[styles.label, { marginBottom: 6 }]}>Safety Precautions:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>• Wear Safety Gear: Wear appropriate safety gear including gloves, goggles, and non-slip shoes to protect yourself during the inspection.</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>• Fall Protection: Use a harness or secure ladder and scaffolding if working on a steep or high roof.</Text>
  <Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>• Weather Conditions: Ensure the weather conditions are safe for inspection. Avoid inspecting in wet or windy conditions.</Text>

  <Text style={[styles.label, { marginBottom: 6 }]}>Steps for Visual Inspection:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>• Initial Overview:</Text>
  <Text style={styles.textIndent}>Walk around the perimeter of the roof to get an initial overview of the surface.</Text>
  <Text style={styles.textIndent}>Take note of any obvious defects or areas that require closer inspection.</Text>

  <Text style={[styles.text, { marginLeft: 16 }]}>• Check for Pinholes:</Text>
  <Text style={styles.textIndent}>Visual Scan: Perform a visual scan of the entire roof surface. Look closely for small holes or gaps in the coating, known as pinholes.</Text>
  <Text style={styles.textIndent}>Flashlight Method: Use a flashlight to shine light across the surface at a low angle. Pinholes will cast small shadows or appear as bright spots.</Text>
  <Text style={styles.textIndent}>Detailed Areas: Pay extra attention to seams, edges, and transitions where pinholes are more likely to occur.</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>• Ensure Even Coverage:</Text>
  <Text style={styles.textIndent}>Uniform Thickness: Verify that the coating is uniformly thick across the entire roof. There should be no thin spots or exposed substrate.</Text>

  <PdfFooter guarantee={guarantee} />
</Page>

{/* Página 41 - Completed Roof Surface (parte 2/2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={styles.textIndent}>Edges and Corners: Check edges, corners, and transitions to ensure they are fully coated and have no exposed areas.</Text>
  <Text style={styles.textIndent}>Colour Consistency: Look for colour consistency across the surface, as variations can indicate uneven application.</Text>

  <Text style={[styles.text, { marginLeft: 16 }]}>• Inspect Details at 150mm:</Text>
  <Text style={styles.textIndent}>Measure Height: Use a measuring tape to check that details such as terminations, upstands, and other critical points are coated to a minimum height of 150mm.</Text>
  <Text style={styles.textIndent}>Detail Work: Ensure all details are properly sealed and the coating is applied consistently at the required height.</Text>

  <Text style={[styles.text, { marginLeft: 16 }]}>
    • {guarantee === '20-year' ? 'Verify Reinforcement Matting:' : 'Verify Joint Tape:'}
  </Text>
  <Text style={styles.textIndent}>
    {guarantee === '20-year'
      ? 'Visible Matting: Inspect areas where reinforcement matting was applied. The matting should be fully embedded in the coating with no exposed edges.'
      : 'Visible Matting: Inspect areas where Joint Tape was applied. The Joint Tape should be fully embedded in the coating with no exposed edges.'}
  </Text>
  <Text style={styles.textIndent}>
    Coverage: Ensure the {guarantee === '20-year' ? 'matting' : 'Joint Tape'} extends to cover all critical areas, such as joints, seams, and around roof penetrations.
  </Text>
  <Text style={styles.textIndent}>
    Bonding: Check that the {guarantee === '20-year' ? 'matting' : 'Joint Tape'} is well-bonded to the substrate and there are no air pockets or wrinkles.
  </Text>

  <Text style={[styles.text, { marginLeft: 16 }]}>• Final Checks:</Text>
  <Text style={styles.textIndent}>Hard-to-Reach Areas: Use an inspection mirror to check hard-to-reach areas and ensure they are properly coated.</Text>
  <Text style={styles.textIndent}>Seams and Joints: Verify that all seams and joints are fully sealed and there are no gaps or openings.</Text>
  <Text style={styles.textIndent}>Overall Condition: Assess the overall condition of the roof surface. Ensure it looks uniform and well-maintained.</Text>

  <Text style={[styles.text, { marginLeft: 16 }]}>• Document Findings:</Text>
  <Text style={styles.textIndent}>Photographic Evidence: Take photos of the roof surface, especially any areas of concern or interest. Capture before and after images if any touch-up work is required.</Text>
  <Text style={styles.textIndent}>Detailed Notes: Write detailed notes on your findings, including any defects, areas that need additional work, and the overall condition of the roof.</Text>

  <Text style={[styles.label, { marginBottom: 6, marginTop: 12 }]}>Addressing Issues:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>• Pinholes: Mark any pinholes with chalk or tape. Prepare a small amount of RapidRoof Pro Detailer and use a brush to fill in the pinholes.</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>• Uneven Coverage: Apply additional coating to any areas with insufficient coverage to achieve uniform thickness.</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>• Detail Adjustments: Correct any issues with details that are not at the required 150mm height. Apply additional coating if necessary.</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    • {guarantee === '20-year' ? 'Reinforcement Matting' : 'Joint Tape'}: Ensure any improperly applied {guarantee === '20-year' ? 'matting' : 'Joint Tape'} is corrected by applying additional coating and embedding new material as needed.
  </Text>

  <Text style={[styles.text, { marginTop: 20 }]}>
    By following these steps, you ensure that the completed roof surface is properly inspected for pinholes, even coverage, correct detailing at 150mm, and proper application of {guarantee === '20-year' ? 'Reinforcement Matting' : 'Joint Tape'}. This thorough inspection helps maintain the integrity and longevity of the roofing system.
  </Text>

  <PdfFooter guarantee={guarantee} />
</Page>

{/* Página 42 - Schedule of Products (parte 1/2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={styles.sectionTitle}>Schedule of Products</Text>


  <Text style={[styles.label, { marginBottom: 6 }]}>LRS RapidRoof Primer @ 0.3kg per m²:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    2-part component primer, comprising of a base component A and an activator component B.
  </Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>Colour – Clear</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>Tin Sizes – 1.5kg, 3kg and 5kg.</Text>
  <Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>
    Typical coverage rates:
    {"\n"}1.5kg tin – 5m²{"\n"}3kg tin – 10m²{"\n"}5kg tin – 16.6m²
  </Text>

  <Text style={[styles.label, { marginBottom: 6 }]}>
    LRS RapidRoof Waterproof BaseCoat @ {guarantee === '20-year' ? '1.25kg' : '1kg'} per m²
  </Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    2-part component waterproofing, comprising of a base component A and an activator component B.
  </Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>Colour – Grey, Anthracite and Black as standard.</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>Tin Sizes – 7.5kg and 15kg</Text>
  <Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>
    Typical Coverage Rates:
    {guarantee === '20-year'
      ? '\n5kg tin – 4m²\n7.5kg tin – 6m²\n15kg tin – 12m²'
      : '\n5kg tin – 5m²\n7.5kg tin – 7.5m²\n15kg tin – 15m²'}
  </Text>

  {guarantee === '20-year' ? (
    <>
      <Text style={[styles.label, { marginBottom: 6 }]}>Reinforcement Matting</Text>
      <Text style={[styles.text, { marginLeft: 16 }]}>
        Used to fully reinforce the RapidRoof BaseCoat.
      </Text>
      <Text style={[styles.text, { marginLeft: 16 }]}>Colour – White</Text>
      <Text style={[styles.text, { marginLeft: 16 }]}>Grade – 150gsm chop strand matting.</Text>
      <Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>
        Roll Sizes – 1m x 25m and 1m x 180m.
      </Text>
    </>
  ) : (
    <>
      <Text style={[styles.label, { marginBottom: 6 }]}>Joint Tape</Text>
      <Text style={[styles.text, { marginLeft: 16 }]}>
        Used to reinforce joints, cracks, splits or changes of substrates.
      </Text>
      <Text style={[styles.text, { marginLeft: 16 }]}>Colour – White</Text>
      <Text style={[styles.text, { marginLeft: 16 }]}>Grade – 150gsm chop strand matting.</Text>
      <Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>
        Roll Sizes – 100mm x 25lm and 100mm x 180lm.
      </Text>
    </>
  )}

  <PdfFooter guarantee={guarantee} />
</Page>

{/* Página 43 - Schedule of Products (parte 2/2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={[styles.label, { marginBottom: 6 }]}>
    LRS RapidRoof Waterproof TopCoat @ {guarantee === '20-year' ? '0.75kg' : '0.5kg'} per m²
  </Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    2-part component waterproofing, comprising of a base component A and an activator component B.
  </Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>Colour – Grey, Anthracite and Black as standard.</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>Tin Sizes – 7.5kg and 15kg</Text>
  <Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>
    Typical Coverage Rates:
    {guarantee === '20-year'
      ? '\n5kg tin – 6.6m²\n7.5kg tin – 10m²\n15kg tin – 20m²'
      : '\n5kg tin – 10m²\n7.5kg tin – 15m²\n15kg tin – 30m²'}
  </Text>

  <Text style={[styles.label, { marginBottom: 6 }]}>LRS RapidRoof Anti-Skid @ 1kg per m²</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    2-part component, comprising of a base component A and an activator component B.
  </Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>Colour – Grey and Black as standard.</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>Tin Sizes – 5kg and 10kg</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Typical Coverage Rates:
    {"\n"}5kg tin – 5m²{"\n"}10kg tin – 10m²
  </Text>

  <PdfFooter guarantee={guarantee} />
</Page>

{/* Página 44 - Additional Information (parte 1/2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={styles.sectionTitle}>Additional Information</Text>
  

  <Text style={[styles.label, { marginBottom: 6 }]}>Primers:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Application: Apply with brush or short pilled roller at the correct coverage rates as it states above.
  </Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Storage Temperatures: LRS RapidRoof Primer must be stored between 5°c and 20°c at all times and kept out of direct sunlight.
  </Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Application Temperatures: Check the ambient and substrate temperatures prior to application. Minimum surface temperature + 0°c and max surface temperature is 35°c.
  </Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    RapidRoof Primer needs to be dry before over coating with RapidRoof BaseCoat.
  </Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Typical drying times at 15°c – 20 minutes.
  </Text>
  <Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>
    If left more than 14 days, the surfaces will need to be re-primed.
  </Text>

  <Text style={[styles.label, { marginBottom: 6 }]}>RapidRoof Pro BaseCoat / TopCoat:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Application: Apply with brush or short piled roller at the correct coverage rates as stated above.
  </Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Storage Temperatures: LRS RapidRoof must be stored between 5°c and 20°c at all times and kept out of direct sunlight.
  </Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Application Temperatures: Check the ambient and substrate temperatures prior to application. Minimum surface temperature + 0°c and the max surface temperature is 35°c.
  </Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    RapidRoof BaseCoat needs to be dry before over coating with RapidRoof TopCoat.
  </Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Typical drying times at 15°c – 20 minutes.
  </Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    If left more than 14 days, the surfaces will need to be re-primed using LRS RapidRoof Primer.
  </Text>

  <PdfFooter guarantee={guarantee} />
</Page>

{/* Página 45 - Additional Information (parte 2/2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={[styles.label, { marginBottom: 6 }]}>RapidRoof Anti-Skid:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Application: Apply with brush or short piled roller at the correct coverage rates as stated above.
  </Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Storage Temperatures: LRS RapidRoof Pro Anti-Skid must be stored between 5°c and 20°c at all times and kept out of direct sunlight.
  </Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Application Temperatures: Check the ambient and substrate temperatures prior to application. Minimum surface temperature + 0°c and the max surface temperature is 35°c.
  </Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    RapidRoof TopCoat needs to be dry before over coating with RapidRoof Anti-Skid.
  </Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Typical drying times at 15°c – 20 minutes.
  </Text>

  <PdfFooter guarantee={guarantee} />
</Page>

{/* Página 46 - General Guidance and Requirements (parte 1/2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={styles.sectionTitle}>General Guidance and Requirements</Text>

  <Text style={[styles.label, { marginBottom: 6 }]}>Drying Out – Equipment:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    These are readily available commercially from local tool plant hire companies.
  </Text>
  <Text style={[styles.text, { marginLeft: 24 }]}>• Leaf Blowers</Text>
  <Text style={[styles.text, { marginLeft: 24 }]}>• Hot Air Blower</Text>
  <Text style={[styles.text, { marginLeft: 24, marginBottom: 12 }]}>• Roof Pumps</Text>

  <Text style={[styles.label, { marginBottom: 6 }]}>Defects:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    This specification provided by LRS is written on the basis that the substrate, roof deck and structures are sound and suitable. We cannot accept responsibility for the consequences of defects in the roof deck or structure.
  </Text>

  <Text style={[styles.label, { marginTop: 12, marginBottom: 6 }]}>Installation:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    All LRS Waterproofing Systems are to be installed in accordance with this specification.
  </Text>

  <Text style={[styles.label, { marginTop: 12, marginBottom: 6 }]}>Building Works:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    It is the contractor’s responsibility to ensure suitable protection of semi-completed or completed works.
  </Text>

  <Text style={[styles.label, { marginTop: 12, marginBottom: 6 }]}>Protection of Works:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    It is the contractor’s responsibility to ensure any plant, equipment or materials being stored or placed onto the waterproofing membrane are sufficiently protected should any other trades require access across the applied waterproofing membrane during or after completion of works.
  </Text>

  <Text style={[styles.label, { marginTop: 12, marginBottom: 6 }]}>Safe Working:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    All works are to be carried out in accordance with the current Health and Safety Legislation.
  </Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Available at https://www.hse.gov.uk/legislation/index.htm
  </Text>

  <PdfFooter guarantee={guarantee} />
</Page>

{/* Página 47 - General Guidance and Requirements (parte 2/2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={[styles.label, { marginBottom: 6 }]}>Inclement Weather Protection:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    If rain is due no LRS Waterproofing coatings should be installed. The contractor must ensure at the end of each day that any exposed membranes or substrates that are susceptible to damage through water ingress are sealed and protected to ensure complete water tightness.
  </Text>

  <Text style={[styles.label, { marginTop: 12, marginBottom: 6 }]}>Maintenance After Installation:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    The new roof coverings should be managed in accordance with the recommendations of BS6229:2003 with regards to ongoing maintenance.
  </Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    They should be routinely inspected and cleared of any debris every spring and autumn. This will need to be undertaken more often if the roof is surrounded by trees etc. Please note that failure to follow maintenance guidelines can invalidate the product guarantee.
  </Text>

  <Text style={[styles.label, { marginTop: 12, marginBottom: 6 }]}>Delays:</Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    All or general areas: Overcoating must be carried out within 14 days of the application of the preceding coat (primer or waterproofing).
  </Text>
  <Text style={[styles.text, { marginLeft: 16 }]}>
    Coatings that are over 14 days will need to be re-primed using LRS RapidRoof Primer at a coverage rate of 0.3kg per m². This should be applied using a brush or short piled roller.
  </Text>

  <PdfFooter guarantee={guarantee} />
</Page>

{/* Página 48 - Safety Advice for Using RapidRoof PMMA (parte 1/2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={styles.sectionTitle}>Safety Advice for Using RapidRoof PMMA</Text>

  <Text style={[styles.label, { marginBottom: 6 }]}>Objective:</Text>
  <Text style={[styles.text, { marginLeft: 16, marginBottom: 12 }]}>
    Ensure safe handling, application, and storage of RapidRoof PMMA (polymethyl methacrylate) roofing products to prevent accidents and health hazards.
  </Text>

  <Text style={[styles.label, { marginBottom: 6 }]}>Safety Precautions:</Text>
  <Text style={[styles.label, { marginLeft: 16, marginBottom: 6 }]}>Personal Protective Equipment (PPE):</Text>
  <Text style={[styles.text, { marginLeft: 24 }]}>• Gloves: Wear chemical-resistant gloves to protect your hands from exposure to PMMA.</Text>
  <Text style={[styles.text, { marginLeft: 24 }]}>• Goggles: Use safety goggles to protect your eyes from splashes.</Text>
  <Text style={[styles.text, { marginLeft: 24 }]}>• Respirator: Use a respirator with organic vapor cartridges if working in poorly ventilated areas to avoid inhaling fumes.</Text>
  <Text style={[styles.text, { marginLeft: 24, marginBottom: 12 }]}>• Clothing: Wear long sleeves, long trousers, and closed-toe shoes to minimize skin exposure.</Text>

  <Text style={[styles.label, { marginLeft: 16, marginBottom: 6 }]}>Ventilation:</Text>
  <Text style={[styles.text, { marginLeft: 24 }]}>• Work Outdoors: Whenever possible, apply PMMA products outdoors or in well-ventilated areas.</Text>
  <Text style={[styles.text, { marginLeft: 24, marginBottom: 12 }]}>• Indoor Application: Use fans or other ventilation systems to ensure adequate airflow when working indoors.</Text>

  <Text style={[styles.label, { marginLeft: 16, marginBottom: 6 }]}>Handling and Storage:</Text>
  <Text style={[styles.text, { marginLeft: 24 }]}>• Storage: Store PMMA products in a cool, dry place away from direct sunlight and sources of ignition. Keep containers tightly closed when not in use. Keep inside between 5°c to 20°c.</Text>
  <Text style={[styles.text, { marginLeft: 24 }]}>• Handling: Avoid spilling or splashing. Handle containers with care to prevent leaks and spills.</Text>
  <Text style={[styles.text, { marginLeft: 24, marginBottom: 12 }]}>• Fire Safety: PMMA products are flammable. Keep away from open flames, sparks, and other sources of ignition. Have fire extinguishing equipment readily available.</Text>

  <Text style={[styles.label, { marginLeft: 16, marginBottom: 6 }]}>Mixing and Application:</Text>
  <Text style={[styles.text, { marginLeft: 24 }]}>• Mixing: Follow LRS instructions for mixing PMMA products. Avoid creating dust or aerosols during mixing.</Text>
  <Text style={[styles.text, { marginLeft: 24, marginBottom: 12 }]}>• Application Tools: Use appropriate tools such as rollers and brushes. Clean tools thoroughly after use.</Text>

  <PdfFooter guarantee={guarantee} />
</Page>

{/* Página 49 - Safety Advice for Using RapidRoof PMMA (parte 2/2) */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={[styles.label, { marginBottom: 6 }]}>First Aid Measures:</Text>
  <Text style={[styles.text, { marginLeft: 24 }]}>• Inhalation: Move to fresh air immediately if you experience dizziness, headaches, or difficulty breathing. Seek medical attention if symptoms persist.</Text>
  <Text style={[styles.text, { marginLeft: 24 }]}>• Skin Contact: Wash exposed skin thoroughly with soap and water. Remove contaminated clothing and wash before reuse. Seek medical attention if irritation persists.</Text>
  <Text style={[styles.text, { marginLeft: 24 }]}>• Eye Contact: Rinse eyes immediately with plenty of water for at least 15 minutes. Seek medical attention if irritation persists.</Text>
  <Text style={[styles.text, { marginLeft: 24, marginBottom: 12 }]}>• Ingestion: Do not induce vomiting. Rinse mouth thoroughly and seek medical attention immediately.</Text>

  <Text style={[styles.label, { marginBottom: 6 }]}>Environmental Protection:</Text>
  <Text style={[styles.text, { marginLeft: 24 }]}>• Spill Containment: In case of a spill, contain and collect the material using inert absorbents (e.g., sand or vermiculite). Dispose of in accordance with local regulations.</Text>
  <Text style={[styles.text, { marginLeft: 24, marginBottom: 12 }]}>• Waste Disposal: Dispose of unused PMMA products and contaminated materials according to local environmental regulations. Do not pour into drains or waterways.</Text>

  <Text style={[styles.label, { marginBottom: 6 }]}>Emergency Procedures:</Text>
  <Text style={[styles.text, { marginLeft: 24 }]}>• Fire: Use carbon dioxide, dry chemical, or foam extinguishers to combat small fires involving PMMA products. Do not use water jet as it may spread the fire.</Text>
  <Text style={[styles.text, { marginLeft: 24, marginBottom: 12 }]}>• Spill Response: Evacuate the area and ventilate. Use personal protective equipment during clean-up. Contain the spill and dispose of the waste properly.</Text>

  <Text style={[styles.label, { marginBottom: 6 }]}>Best Practices:</Text>
  <Text style={[styles.text, { marginLeft: 24 }]}>• Training: Ensure all personnel handling PMMA products are trained on proper use, potential hazards, and emergency procedures.</Text>
  <Text style={[styles.text, { marginLeft: 24 }]}>• Labelling: Clearly label all PMMA containers with the product name, hazard warnings, and safety instructions.</Text>
  <Text style={[styles.text, { marginLeft: 24 }]}>• Monitoring: Regularly monitor air quality in the work area to ensure ventilation systems are effective in reducing airborne concentrations of hazardous substances.</Text>
  <Text style={[styles.text, { marginLeft: 24, marginBottom: 12 }]}>• Documentation: Keep Material Safety Data Sheets (MSDS) for PMMA products accessible to all personnel. Review and understand the information provided in the MSDS.</Text>

  <Text style={[styles.text, { marginTop: 20 }]}>
    By following these safety guidelines, you can minimize the risk of accidents and health hazards when using RapidRoof PMMA products. Ensuring proper handling, storage, and personal protection will help maintain a safe working environment.
  </Text>

  <PdfFooter guarantee={guarantee} />
</Page>

{/* Página 50 - Photographic Evidence */}
{photos?.length > 0 && (
  <Page size="A4" style={styles.page}>
    <PdfHeader reference={reference} />

    <Text style={styles.sectionTitle}>Photographic Evidence</Text>
    <Text style={[styles.text, { marginBottom: 12 }]}>
      Photographs provided for reference during or after installation process.
    </Text>

    <View style={{
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 12,
    }}>
      {photos.slice(0, 4).map((src, idx) => (
        <View
          key={idx}
          style={{
            width: '48%',
            height: 250,
            marginBottom: 12,
            border: '1pt solid #ccc',
            padding: 4,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <Image
            src={src}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </View>
      ))}
    </View>

    <PdfFooter guarantee={guarantee} />
  </Page>
)}

{/* Página 51 - Guarantee */}
<Page size="A4" style={styles.page}>
  <PdfHeader reference={reference} />

  <Text style={styles.sectionTitle}>Guarantee</Text>
  <Text style={[styles.text, { marginBottom: 12 }]}>
    Materials only. The following guaranteed specification is covered by LRS product
    guarantee for the period of {guarantee === '20-year' ? '20-years' : '10-years'} from the date of practical completion.
  </Text>

  <Text style={[styles.text, { marginBottom: 12 }]}>
    Please Note: Only products supplied by LRS will be covered in this guarantee.
    We are unable to guarantee patches or repairs.
  </Text>

  <Text style={styles.text}>Regards</Text>
  <Text style={styles.text}>Paul Jones</Text>
  <Text style={styles.text}>Technical Manager</Text>
  <Text style={styles.text}>T: 01948 841 877</Text>
  <Text style={styles.text}>E: paul.jones@lrs-systems.co.uk</Text>

  <PdfFooter guarantee={guarantee} />
</Page>


{/* Página final - estilo profesional como la imagen 2 */}

<Page size="A4" style={{ padding: 0, margin: 0 }}>
  {/* Imagen superior */}
  <Image src="/last.png" style={{ width: '100%' }} />

  {/* Contenido inferior, compactado */}
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingHorizontal: 60,
      paddingTop: 30,
      paddingBottom: 40, // usamos el espacio inferior útil
      height: 'auto',
    }}
  >
    {/* Columna izquierda */}
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: 'bold',
          color: '#f5a623',
          marginBottom: 10,
        }}
      >
        LIQUID ROOFING SYSTEMS
      </Text>

      <Text style={{ fontSize: 12, marginBottom: 3 }}>
        Roofing House, Prees Green, Whitchurch, SY13 2BN
      </Text>
      <Text style={{ fontSize: 12, marginBottom: 3 }}>
        01948 841 877
      </Text>
      <Text style={{ fontSize: 12, marginBottom: 3 }}>
        enquiries@lrs-systems.co.uk
      </Text>
      <Text style={{ fontSize: 12, color: '#f5a623' }}>
        www.lrs-systems.co.uk
      </Text>
    </View>

    {/* Columna derecha: logo alineado con el texto */}
    <Image
      src="https://i.postimg.cc/WhWy9YdP/lrs-1.png"
      style={{ width: 110, marginTop: 6 }}
    />
  </View>
</Page>



    </Document>
  );
};

export default PdfDocument;
