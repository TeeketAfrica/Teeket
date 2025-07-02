import { Html5Qrcode } from "html5-qrcode";
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Select,
} from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import { teeketApi } from "../../../../utils/api";
import DashboardLayout from "../../../../components/layouts/DashboardLayout";

const ScanToAttend = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState("");
  const [orderId, setOrderId] = useState("");
  const navigate = useNavigate();
  const html5QrCodeRef = useRef(null);
  const [fileImageUrl, setFileImageUrl] = useState(null);
  const [cameras, setCameras] = useState([]);
  const [selectedCameraId, setSelectedCameraId] = useState(null);

  useEffect(() => {
    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length > 0) {
          setCameras(devices);
          setSelectedCameraId(devices[0].id);
        } else {
          alert("No cameras found");
        }
      })
      .catch((err) => {
        console.error("Error getting cameras:", err);
        alert("Could not access cameras. Please check permissions.");
      });
  }, []);

  const startScanner = async () => {
    if (!selectedCameraId) return;

    try {
      if (!html5QrCodeRef.current) {
        html5QrCodeRef.current = new Html5Qrcode("qr-reader");
      }

      const config = {
        fps: 10,
        qrbox: { width: 200, height: 200 },
      };

      setIsScanning(true);

      await html5QrCodeRef.current.start(
        selectedCameraId,
        config,
        (decodedText) => {
          stopScanner();
          setScanResult(decodedText);
        },
        (errorMessage) => {
          console.log("Scan error:", errorMessage);
        }
      );
    } catch (err) {
      console.error("Camera start failed:", err);
      alert("Failed to start camera. Please check permissions.");
      setIsScanning(false);
    }
  };

  const stopScanner = () => {
    if (html5QrCodeRef.current && isScanning) {
      html5QrCodeRef.current
        .stop()
        .then(() => {
          html5QrCodeRef.current?.clear();
          setIsScanning(false);
        })
        .catch((err) => console.error("Error stopping scanner:", err));
    }
  };

  const handleVerifyOrder = async () => {
    try {
      const response = await teeketApi.post(
        `/events/tickets/qr-code/verify`,
        {
          token: scanResult,
        }
      );
      const id = response.data.data.order_id;
      setOrderId(id);
      navigate(`/app/preview-scanned/${id}`);
    } catch (error) {
      navigate(
        `/app/preview-scanned/${
          error.response?.data?.message || "An error occurred"
        }`
      );
    }
  };

  useEffect(() => {
    if (scanResult) {
      handleVerifyOrder();
      stopScanner();
    }
  }, [scanResult]);

  return (
    <DashboardLayout>
      {orderId ? (
        <div>
          Success:{" "}
          <Link to={`/app/preview-scanned/${orderId}`}>Preview Ticket</Link>
        </div>
      ) : (
        <VStack spacing={8} p={4} maxW="md" margin="0 auto">
          <Heading as="h1" size="lg" textAlign="center">
            Scan Ticket QR Code
          </Heading>
          <Text textAlign="center" color="gray.600">
            Position the QR code within the frame to scan
          </Text>

          {fileImageUrl ? (
            <Box
              width="100%"
              minH="300px"
              borderWidth={2}
              borderColor="green.500"
              borderRadius="md"
              overflow="hidden"
              bg="gray.100"
            >
              <img
                src={fileImageUrl.objectUrl}
                alt="Uploaded QR"
                style={{
                  width: "100%",
                  objectFit: "contain",
                  maxHeight: "300px",
                }}
              />
            </Box>
          ) : (
            <Box
              id="qr-reader"
              width="100%"
              borderWidth={2}
              borderColor={isScanning ? "blue.500" : "gray.500"}
              borderRadius="md"
              overflow="hidden"
              minH="300px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="gray.100"
              position="relative"
            />
          )}

          {!fileImageUrl && cameras.length > 0 && (
            <Box w="100%">
              <Text mb={1}>Select Camera</Text>
              <Select
                value={selectedCameraId ?? ""}
                onChange={(e) => setSelectedCameraId(e.target.value)}
              >
                {cameras.map((camera) => (
                  <option key={camera.id} value={camera.id}>
                    {camera.label || `Camera ${camera.id}`}
                  </option>
                ))}
              </Select>
            </Box>
          )}

          <VStack w="100%" spacing={4}>
            {!fileImageUrl &&
              (!isScanning ? (
                <Button
                  onClick={startScanner}
                  variant="primary"
                  colorScheme="blue"
                  w="100%"
                  size="lg"
                >
                  Start Scanning
                </Button>
              ) : (
                <Button
                  onClick={stopScanner}
                  variant="outline"
                  colorScheme="red"
                  w="100%"
                  size="lg"
                >
                  Stop Scanning
                </Button>
              ))}

            {!fileImageUrl ? (
              <Button
                as="label"
                variant="secondary"
                w="100%"
                size="lg"
                cursor="pointer"
              >
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFileImageUrl({
                        file: file,
                        objectUrl: URL.createObjectURL(file),
                      });
                    }
                  }}
                />
                Scan from Image
              </Button>
            ) : (
              <>
                <Button
                  variant="solid"
                  colorScheme="blue"
                  w="100%"
                  size="lg"
                  onClick={async () => {
                    if (fileImageUrl.file) {
                      const qr = new Html5Qrcode("qr-reader-file");
                      try {
                        const decodedText = await qr.scanFile(
                          fileImageUrl.file,
                          true
                        );
                        setScanResult(decodedText);
                      } catch (err) {
                        console.error("File scan failed:", err);
                        alert("Unable to detect QR code in image.");
                      } finally {
                        qr.clear();
                      }
                    }
                  }}
                >
                  Scan Image
                </Button>
                <Button
                  variant="outline"
                  colorScheme="gray"
                  size="lg"
                  onClick={() => setFileImageUrl(null)}
                  w="100%"
                >
                  Clear Uploaded Image
                </Button>
              </>
            )}
          </VStack>

          <div id="qr-reader-file" style={{ display: "none" }} />
        </VStack>
      )}
    </DashboardLayout>
  );
};

export default ScanToAttend;
