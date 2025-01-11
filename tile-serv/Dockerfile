# Fetch tilemap server from source
FROM maptiler/tileserver-gl:latest

# Expose port 8080
EXPOSE 8080

# Run tile-server container using alberta_source_tiles.mbtiles as tile src
CMD ["run", "--file", "alberta_source_tiles.mbtiles"]